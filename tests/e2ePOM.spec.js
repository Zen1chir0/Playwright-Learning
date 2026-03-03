import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

test.describe('should the login page allow login', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should go to the dashboard', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
});