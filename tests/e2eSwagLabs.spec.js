import { test, expect } from '@playwright/test';

//Encapsulate tests alike
test.describe('End to end test', () => {
    test.beforeEach('login',  async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await expect(page.locator('.login_logo')).toHaveText(/Swag labs/i);

        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');

        await page.getByRole('button', { name: 'Login' }).click();
    })

    test('login-verifier', async ({ page }) => {
        await expect(page.locator('.inventory_container')).toHaveText(/Sauce Labs Backpack/i);

    });
})