import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/InventoryPage.js';
import dotenv from 'dotenv'

dotenv.config();//implemented this game changer because credentials are sensitive data haha

test.describe('should the login page allow login', () => {
    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.login( process.env.USER, process.env.PASS);
    });

    test('should go to the dashboard to cart an item', async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/i);

       

        await inventoryPage.addToCart();
    })
});
