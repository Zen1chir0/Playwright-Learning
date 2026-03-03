import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';

test.describe('should the login page allow login', () => {
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should go to the dashboard to cart an item', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        inventoryPage = new InventoryPage(page);

        await inventoryPage.addToCart();
    })
});
