import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';

import dotenv from 'dotenv';

dotenv.config();

test.describe('should allow login', () =>  {
    test('should input login credentials to login', async ({ page }) => {
        let loginPage = new LoginPage(page);

        await loginPage.login(process.env.USER, process.env.PASS);
        await expect(page).toHaveURL(/inventory.html/i);
    });
})