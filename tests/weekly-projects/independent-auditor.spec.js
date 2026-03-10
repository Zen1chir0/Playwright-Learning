import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';
import CheckoutStep1Page from '../../pages/CheckoutStep1.js';
import CheckoutStep2Page from '../../pages/CheckoutStep2.js';

import { priceArray } from '../../utils/independent-auditor-utils/character-stripper.js';

import dotenv from "dotenv";

dotenv.config();

test.describe('should verify prices accuracy', async () =>{
    let loginPage;
    let inventoryPage;
    let checkoutPage;
    let checkoutStep1Page;
    let checkoutStep2Page;
    let rawStrings;

    test.beforeEach('should keep logged in and items state intact', async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutStep1Page = new CheckoutStep1Page(page);
        checkoutStep2Page = new CheckoutStep2Page(page);

        await loginPage.login(process.env.USER, process.env.PASS);

        await expect(page).toHaveURL(/inventory.html/i);
        await inventoryPage.addToCart();

        await expect(page).toHaveURL(/cart.html/i);
        await checkoutPage.clickCheckout();

        await expect(page).toHaveURL(/checkout-step-one.html/i);
        await checkoutStep1Page.checkOut(process.env.FIRST, process.env.LAST, process.env.PC);

        await expect(page).toHaveURL(/checkout-step-two.html/i);

    });

        test('should verify subtotal of the items in cart', async ({ page }) => {

          rawStrings = await checkoutStep2Page.priceScraper(); //Get the raw strings from UI, it is stored inside an array. usage of seprate function from checkoutStep2Page.
          
          const cleanedPrices = priceArray(rawStrings); //we'll passs the taken prices which are stored in an array to be cleansed(strip off their $ sign) so we can proceed to add them.
          const calculatedSum = cleanedPrices.reduce((total, p) => total + p, 0); //we take the cleansed numbers so we can now REDUCE them, in this case reduce them into a single number which is the total.
          
          const uiSubTotalRaw = await checkoutStep2Page.uiSubtotal(); //here we take UI's total but a problem occured, what were getting is a series of strings so...
          const uiSubTotal = parseFloat(uiSubTotalRaw.replace('Item total: $', '')); //we replace the strings from the UI with nothing 
          
          console.log(`Independent Auditor result for SubTotal:  ${calculatedSum} And for the UI subtotal: ${uiSubTotal}`);
          expect(calculatedSum).toBeCloseTo(uiSubTotal, 2);

          await checkoutStep2Page.finish();//finish here
        });

        test('should verify Total, which includes tax', async ({ page }) => {
            rawStrings = await checkoutStep2Page.priceScraper();

            const cleanedPrices = priceArray(rawStrings);
            const calculatedSum = cleanedPrices.reduce((total, p) => total + p, 0);

            const tax = await checkoutStep2Page.uiTax();
            const cleanedTax = parseFloat(tax.replace(/[^0-9.]/g, ''));

            const total = cleanedTax + calculatedSum;
            
            const uiTotalRaw = await checkoutStep2Page.uiTotal();
            const uiTotal = parseFloat(uiTotalRaw.replace(/[^0-9.]/g, ''));

            console.log(`Independent Auditor result for Total: ${total} And for the UI Total: ${uiTotal}`);
            expect(total).toBeCloseTo(uiTotal, 2);;

            await checkoutStep2Page.finish();//finish here
        })

});