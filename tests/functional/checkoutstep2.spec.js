import { test, expect } from'@playwright/test';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import CheckoutStep1Page from '../../pages/CheckoutStep1.js';
import CheckoutStep2Page from '../../pages/CheckoutStep2.js';

import dotenv from 'dotenv';

dotenv.config();

test.describe('should complete the purchase flow', () => {
    let loginPage;
    let inventoryPage;
    let checkoutStep1Page;
    let checkoutPage;
    let checkoutStep2Page;

    test.beforeEach('should keep logged in state intact', async({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutStep1Page = new CheckoutStep1Page(page);
        checkoutPage = new CheckoutPage(page);
        checkoutStep2Page = new CheckoutStep2Page(page);

        await loginPage.login(process.env.USER, process.env.PASS);

        await expect(page).toHaveURL(/inventory.html/i);
        await inventoryPage.addToCart();

        await expect(page).toHaveURL(/cart.html/i);
        const itemQuantity = await page.locator('[data-test="item-quantity"]').count();
        expect(itemQuantity).toBeGreaterThanOrEqual(1);
        await checkoutPage.clickCheckout();

        await expect(page).toHaveURL(/checkout-step-one.html/i);
        await checkoutStep1Page.checkOut(process.env.FIRST, process.env.LAST, process.env.PC);
    });

    test('should allow to complete purchase', async ({ page }) => {
        await expect(page).toHaveURL(/checkout-step-two/i);
        await checkoutStep2Page.finish();
    });
})