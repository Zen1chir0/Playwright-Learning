import { test, expect } from '@playwright/test';

//test.describe to group up tests alike
test.describe('Login Test', () => {
  //simple usage of beforeEach function
  test.beforeEach(async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    
     await expect(page.locator('.login_logo')).toHaveText(/Swag labs/i);
     
     //login handler
     await page.getByPlaceholder('Username').fill('standard_user');
     await page.getByPlaceholder('password').fill('secret_sauce');

     await page.getByRole('button', { name: 'Login' }).click();
})

  test('login-verifier', async ({ page }) => {
    //page goto isnt needed because the beforeEach brough me there


    //verifies login
    await expect(page.locator('.inventory_container')).toHaveText(/Sauce Labs Backpack/i);
  });

});