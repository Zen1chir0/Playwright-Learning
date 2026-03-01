import { test, expect } from '@playwright/test';

  test.beforeEach('landing page', async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    
     await expect(page.locator('.login_logo')).toHaveText(/Swag labs/i);
     
     //login handler
     await page.getByPlaceholder('Username').fill('standard_user');
     await page.getByPlaceholder('password').fill('secret_sauce');

     await page.getByRole('button', { name: 'Login' }).click();
})
