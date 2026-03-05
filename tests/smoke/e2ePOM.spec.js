import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import CheckoutStep1Page from '../../pages/CheckoutStep1.js';
import dotenv from 'dotenv'

dotenv.config();//implemented this game changer because credentials are sensitive data haha

test.describe('should the login page allow login', () => {
    let loginPage;
    let inventoryPage;
    let checkoutPage;
    let checkoutStep1Page;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutStep1Page = new CheckoutStep1Page(page);

        await loginPage.login( process.env.USER, process.env.PASS);
    });

    /*
    Here, I fully understood the concept and use of beforeEach(it always runs before the test block, keeping the state intact). 
    I also discovered here the concept of trade-off management.

    I opt to the decision of building both monolithic and modular approach of writing this E2E in a POM manner.
    > Monolithic approach tackles the idea of full major component tests, full E2E flow.
    > Modular approach leans for the isolated feature tests.

    Both are good in their own way but trade-offs are:
    > Monolithic = faster but harder to maintain and riskier.
    > Modular = slower but independent and production-ready.

    This file will be my monolithic file.
    */
    test('e2e continuation', async ({ page }) => {

        await test.step('Add to Cart', async () => {
          await expect(page).toHaveURL(/inventory.html/i);
          await inventoryPage.addToCart();
        });

        await test.step('Cart path', async () => {
          await expect(page).toHaveURL(/cart.html/i);
          //here i added a simple verifier that validates ifr thee is an item to be checked-out.
          //I also understood here that complex or checkers like this must be in spec files rather than page files, though if something is complex it must be made into a separate file to promote a cleaner environment.
          const cartItem = await page.locator('[data-test="item-quantity"]').count();
          expect(cartItem).toBeGreaterThanOrEqual(1);
          await checkoutPage.clickCheckout();
        });

        await test.step('Checkout path', async () => {
          await expect(page).toHaveURL(/checkout-step-one.html/i);

          await checkoutStep1Page.checkOut(process.env.FIRST, process.env.LAST, process.env.PC);

        });




    });
});
