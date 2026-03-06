import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';

import dotenv from 'dotenv';

dotenv.config();

test.describe('should allow checking out an item', () => {
    let loginPage;
    let inventoryPage;
    let checkoutPage;

    test.beforeEach('should allow login and keep logged in state intact', async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.login(process.env.USER, process.env.PASS);

        await expect(page).toHaveURL(/inventory.html/i);
        await inventoryPage.addToCart();

    });

    test('should allow checkout', async ({ page }) => {
        await expect(page).toHaveURL(/cart.html/i);
        const itemQuantity = await page.locator('[data-test="item-quantity"]').count();
        expect(itemQuantity).toBeGreaterThanOrEqual(1);
    })

});