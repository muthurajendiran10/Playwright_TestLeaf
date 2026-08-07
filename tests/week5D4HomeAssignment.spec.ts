/**
 * Week 5 – Day 4 Home Assignment
 * ─────────────────────────────────────────────────────────────────────────────
 * Demonstrates:
 *  • Reusing a Salesforce session via Storage State (sf-storage.json)
 *  • Normal (fresh) login for LeafTaps
 *  • Test annotations: test.only(), test.slow(), test.fail(),
 *                      test.fixme(), test.skip()
 *
 * PREREQUISITE: Run sf.setup.spec.ts first to generate sf-storage.json
 *   npx playwright test tests/sf.setup.spec.ts --project=chromium
 *
 * Then run this file:
 *   npx playwright test tests/week5D4HomeAssignment.spec.ts --project=chromium
 */

import { test, expect } from '@playwright/test';

// ─── Salesforce constants ─────────────────────────────────────────────────────
const SF_HOME_URL = 'https://login.salesforce.com/';

// ─── LeafTaps constants ───────────────────────────────────────────────────────
const LT_URL      = 'http://leaftaps.com/opentaps/control/main';
const LT_USERNAME = 'DemoSalesManager';
const LT_PASSWORD = 'crmsfa';

// =============================================================================
// SALESFORCE TESTS  –  session reused from sf-storage.json
// =============================================================================
test.describe('Salesforce Tests', () => {
  // Inject the saved authenticated session for every test in this describe block
 // test.use();

  // ── SF-TC001 ──────────────────────────────────────────────────────────────
  // test.only()  →  Only this test runs within the suite when the annotation
  //                 is active (useful for focused debugging).
  // NOTE: Remove or comment out test.only() before committing to CI.
  test.only('SF-TC001: Verify Salesforce homepage using stored session', async ({ page }) => {
    // Navigate to Salesforce – the stored cookies skip the login page
    await page.goto(SF_HOME_URL);

await page.locator('//form[@id="login_form"]/descendant::input[@id="username"]').fill('dilipkumar.rajendran@testleaf.com')
//password
await page.locator('//form[@id="login_form"]/descendant::input[@id="password"]').fill('TestLeaf@2025')
//login button
await page.locator('//form[@id="login_form"]/descendant::input[@id="Login"]').click()
await page.waitForTimeout(5000)

    // Wait for Salesforce to complete all redirects after login
    await page.waitForURL((url) => !url.href.includes('login.salesforce.com'), {
      timeout: 30_000,
    });

    // Let the Lightning page finish loading (avoids asserting on a mid-redirect DOM)
    await page.waitForLoadState('domcontentloaded');

    console.log(`Redirected to: ${page.url()}`);

    // Verify we landed on the Salesforce org (URL contains salesforce.com)
    await expect(page).toHaveURL('https://testleaf.lightning.force.com/lightning/page/home', { timeout: 15_000 });
  });

  // ── SF-TC002 ──────────────────────────────────────────────────────────────
  // test.slow()  →  Triples the default timeout for this test, suitable for
  //                 slow network pages or heavy Salesforce Lightning loads.
  test('SF-TC002: Navigate to Salesforce Leads page (slow page load)', async ({ page }) => {
    test.slow(); // triples the configured timeout for this test only

    await page.goto(SF_HOME_URL);

    // Wait for any heavy Lightning redirect to complete
    await page.waitForLoadState('networkidle');
    
await page.locator('//form[@id="login_form"]/descendant::input[@id="username"]').fill('dilipkumar.rajendran@testleaf.com')
//password
await page.locator('//form[@id="login_form"]/descendant::input[@id="password"]').fill('TestLeaf@2025')
//login button
await page.locator('//form[@id="login_form"]/descendant::input[@id="Login"]').click()
await page.waitForTimeout(5000)


    // Navigate within the app (Lightning URL pattern)
    const orgBaseUrl = page.url().replace(/\/lightning.*$/, '');
    await page.goto(`${orgBaseUrl}/lightning/o/Lead/list`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/lightning\/o\/Lead/, { timeout: 15_000 });
    console.log(`Navigated to: ${page.url()}`);
  });

  // ── SF-TC003 ──────────────────────────────────────────────────────────────
  // test.fail()  →  Marks this test as EXPECTED to fail.
  //                 The test runner treats a passing result as an error.
  //                 Used here to simulate an invalid / expired session check.
  test.fail('SF-TC003: Invalid session – test.fail() annotation demo', async ({ page }) => {
    // test.use() cannot be called inside a test body – removed.
    // With no valid stored session, Salesforce keeps the user on the login page.
    await page.goto(SF_HOME_URL);

    // With no valid session the page stays on login.salesforce.com.
    // We assert that the app home is loaded – which WILL fail (as expected).
    await expect(page).toHaveURL(/lightning\/page\/home/);
  });
});

// =============================================================================
// LEAFTAPS TESTS  –  full login on every test (no stored state)
// =============================================================================
test.describe('LeafTaps Tests', () => {
  // Clear any globally configured storage state so each test starts
  // with a clean unauthenticated context (fresh login required).
  test.use({ storageState: { cookies: [], origins: [] } });

  // ── LT-TC001 ──────────────────────────────────────────────────────────────
  // Normal login + homepage verification
  test('LT-TC001: Login with valid credentials and verify homepage', async ({ page }) => {
    // Step 1: Navigate to LeafTaps
    await page.goto(LT_URL);

    // Step 2: Enter valid credentials
    await page.getByRole('textbox', { name: 'Username' }).fill(LT_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(LT_PASSWORD);

    // Step 3: Submit the login form
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 4: Verify successful login – URL no longer points to the login page
    await page.waitForURL(/opentaps\/control\/(?!main)/, { timeout: 15_000 });

    // Step 5: Confirm the main navigation is present
    await expect(page.getByRole('link', { name: 'CRM/SFA' })).toBeVisible();
    console.log(`LeafTaps login successful. URL: ${page.url()}`);
  });

  // ── LT-TC002 ──────────────────────────────────────────────────────────────
  // test.fail()  →  Login with wrong credentials is expected to fail the
  //                 positive assertion, confirming the app rejects bad logins.
  test.fail('LT-TC002: Invalid login should be rejected (test.fail demo)', async ({ page }) => {
    await page.goto(LT_URL);

    await page.getByRole('textbox', { name: 'Username' }).fill('InvalidUser');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // This assertion WILL fail because the wrong credentials keep us on the
    // login page – test.fail() tells Playwright this outcome is expected.
    await expect(page).toHaveURL(/opentaps\/control\/(?!main)/);
  });

  // ── LT-TC003 ──────────────────────────────────────────────────────────────
  // test.fixme()  →  Marks the test as broken / incomplete; it is skipped
  //                  and highlighted in the report for future attention.
  test.fixme('LT-TC003: Incomplete lead creation flow (test.fixme demo)', async ({ page }) => {
    await page.goto(LT_URL);

    await page.getByRole('textbox', { name: 'Username' }).fill(LT_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(LT_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'CRM/SFA' }).click();
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.getByRole('link', { name: 'Create Lead' }).click();

    // TODO: Fill in lead fields and assert successful creation.
    // Implementation is incomplete – kept here for future completion.
    await expect(page.locator('#createLeadForm_companyName')).toBeVisible();
  });

  // ── LT-TC004 ──────────────────────────────────────────────────────────────
  // test.skip()  →  Unconditionally skips this optional test.
  //                 Use with a condition for environment-based skipping, e.g.:
  //                 test.skip(process.env.CI === 'true', 'Skipped on CI')
  test.skip('LT-TC004: Optional – verify CRM/SFA module visibility (test.skip demo)', async ({ page }) => {
    await page.goto(LT_URL);

    await page.getByRole('textbox', { name: 'Username' }).fill(LT_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(LT_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL(/opentaps\/control\/(?!main)/, { timeout: 15_000 });

    // Verify all top-level module links are visible after login
    await expect(page.getByRole('link', { name: 'CRM/SFA' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Home' })).toBeVisible();
  });
});
