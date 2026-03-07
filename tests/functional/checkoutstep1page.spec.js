import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import CheckoutStep1Page from '../../pages/CheckoutStep1.js';

import dotenv from 'dotenv';

dotenv.config();

test.describe('should allow input information for delivery', () => {
    let loginPage;
    let inventoryPage;
    let checkoutPage;
    let checkoutStep1Page;

    test.beforeEach('keep logged in state intact', async({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutStep1Page = new CheckoutStep1Page(page);

        await loginPage.login(process.env.USER, process.env.PASS); //Logging in
        await expect(page).toHaveURL(/inventory.html/i);//are we in the right place? 
        await inventoryPage.addToCart();//add this item to cart and click cart btn

        const itemQuantity = await page.locator('[data-test="item-quantity"]').count();
        expect(itemQuantity).toBeGreaterThanOrEqual(1);//do we have an item to checkout? 

        await expect(page).toHaveURL(/cart.html/i);
        await checkoutPage.clickCheckout();
    });

    test('should allow to input customer data', async({page}) => {
        await expect(page).toHaveURL(/checkout-step-one.html/i);// are we, once again, in the right place? 
        await checkoutStep1Page.checkOut(process.env.FIRST, process.env.LAST, process.env.PC);
    });
})