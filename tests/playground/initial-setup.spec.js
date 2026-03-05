import { test, expect } from '@playwright/test';


//this is my first playwright code(i looked at docs of course, what i learned was the test is named has title? then asynchronously run the code inside of the block which was to go to the link and then verify if the page of that link has a title inside named playwright)
test('has title', async({ page }) => {
    await page.goto('https://playwright.dev/docs/writing-tests#first-test');

    await expect(page).toHaveTitle('Playwright');
}) 