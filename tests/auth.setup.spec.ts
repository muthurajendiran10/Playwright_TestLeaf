import { test } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

test('Login and save storage state', async ({ page }) => {
  await page.goto('https://leaftaps.com/opentaps/control/main');

  await page.getByRole('textbox', { name: 'Username' }).fill('demoCSR2');
  await page.getByRole('textbox', { name: 'Password' }).fill('crmsfa');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait until login is complete and we're past the login page
  await page.waitForURL(/opentaps\/control\/(?!main)/, { timeout: 30000 });

  // Save authenticated storage state
  await page.context().storageState({ path: authFile });
});
