import { test, expect } from '@playwright/test';
import LoginPage from "../../pages/LoginPage.js";
import InventoryPage from "../../pages/InventoryPage.js";

import dotenv from "dotenv";

dotenv.config();

test.describe('Logging in and add to cart', () => {
    let loginPage; //Declare them here so they can be used globally within this test.describe
    let inventoryPage;
        

    test.beforeEach('Login handler to keep logged in state intact', async ({ page }) => {
         loginPage = new LoginPage(page);
         inventoryPage = new InventoryPage(page);

         await loginPage.login(process.env.USER, process.env.PASS);
    });

     test('should allow add to cart', async ({ page }) => {
         await expect(page).toHaveURL(/inventory.html/i);

         await inventoryPage.addToCart();
    });
})