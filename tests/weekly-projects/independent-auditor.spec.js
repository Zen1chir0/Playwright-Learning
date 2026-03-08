import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import CheckoutStep1Page from '../../pages/CheckoutStep1.js';
import CheckoutStep2Page from '../../pages/CheckoutStep2.js';

import calculateSubtotal from '../../utils/independent-auditor-utils/auditor.js';

import dotenv from "dotenv";

dotenv.config();

test.describe('should verify prices accuracy', async () =>{
    let loginPage;
    let inventoryPage;
    let checkoutPage;
    let checkoutStep1Page;
    let checkoutStep2Page;

    test.beforeEach('should keep logged in and items state intact', async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutStep1Page = new CheckoutStep1Page(page);
        checkoutStep2Page = new CheckoutStep2Page(page);

        await loginPage.login(process.env.USER, process.env.PASS);

        await expect(page).toHaveURL(/inventory.html/i);
        await inventoryPage.addToCart();

        await expect(page).toHaveURL(/cart.html/i);
        await checkoutPage.clickCheckout();

        await expect(page).toHaveURL(/checkout-step-one.html/i);
        await checkoutStep1Page.checkOut(process.env.FIRST, process.env.LAST, process.env.PC);

        await expect(page).toHaveURL(/checkout-step-two.html/i);
        await checkoutStep2Page.finish();


    });

    test('should verify subtotal of the items in cart', async ({ page }) => {
        const rawStrings = checkoutStep2Page.priceScraper();
        const calculatedSubtotal = calculateSubtotal(rawStrings);
        const subTotalFromUI = await checkoutStep2Page.uiSubtotal();

        expect(calculatedSubtotal).toBe(subTotalFromUI);
    });

});