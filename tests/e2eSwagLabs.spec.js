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

    test('Dashboard -> Completion', async ({ page }) => {
        await expect(page.locator('.inventory_container')).toHaveText(/Sauce Labs Backpack/i);

        await page.locator('#add-to-cart-sauce-labs-backpack').click();

        //checkout
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        //another inputs for details
        await page.getByPlaceholder('First Name').fill('Name');
        await page.getByPlaceholder('Last Name').fill('Name');
        await page.getByPlaceholder('Zip/Postal Code').fill('1122');
    
        await page.locator('[data-test="continue"]').click();

        await page.locator('[data-test="finish"]').click();
        await page.locator('[data-test="back-to-products"]').click();

        await page.locator('#react-burger-menu-btn').click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
    });
})

//Completed it but I feel un impressed, all i did was direct things. never really coded it in a way thats innovative. this is just cluttered.
//I discovered POM, a structured and cleaner way of implementating testing. I'll try to refactor this in POM.