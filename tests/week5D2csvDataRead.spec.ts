import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

// Disable stored session credentials so the login page is shown fresh for each test
test.use({ storageState: { cookies: [], origins: [] } });

// Read and parse the CSV file
const csvFilePath = path.join(__dirname, '..', 'utils', 'loginData.csv');
const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
const loginData: { username: string; password: string }[] = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

for (const record of loginData) {
  test(`CSV Login - ${record.username}`, async ({ page }) => {
    // Navigate to the opentaps login page
    await page.goto('https://leaftaps.com/opentaps/control/main');

    // Enter username
    await page.locator('#username').fill(record.username);

    // Enter password
    await page.locator('#password').fill(record.password);

    // Click Login
    await page.locator('//input[@value="Login"]').click();

    // Verify CRM/SFA home page is displayed
    await expect(page.locator('//div[@for="crmsfa"]')).toBeVisible();

    console.log(`Login successful for user: ${record.username}`);
  });
}
