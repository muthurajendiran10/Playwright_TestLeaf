import { test, expect } from '@playwright/test';

test('Navigate to CRM/SFA without login page', async ({ page }) => {
  // Storage state is injected by the config — login page should be skipped
  await page.goto('https://leaftaps.com/opentaps/control/main');

  // Verify the login page is NOT shown
  await expect(page.getByRole('textbox', { name: 'Username' })).not.toBeVisible();

  // Click on CRM/SFA link
  await page.getByRole('link', { name: 'CRM/SFA' }).click();

  // Validate navigation to CRM/SFA
  await expect(page).toHaveURL(/crmsfa/);
  await expect(page).toHaveTitle(/CRM/);
});
