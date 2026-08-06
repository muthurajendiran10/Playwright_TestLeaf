import { test, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import leadDataJson from '../utils/leadData.json';

// Disable stored auth so the login page is always shown fresh
test.use({ storageState: { cookies: [], origins: [] } });

// -----------------------------------------------------------------------
// Type definition for lead test data
// -----------------------------------------------------------------------
interface LeadData {
  testId: string;
  username: string;
  password: string;
  companyName: string;
  firstName: string;
  lastName: string;
}

// -----------------------------------------------------------------------
// Helper: Create Lead workflow
// -----------------------------------------------------------------------
async function createLead(page: Page, lead: LeadData): Promise<void> {
  // Step 1: Navigate to the application
  await page.goto('http://leaftaps.com/opentaps/control/main');

  // Step 2: Enter username
  await page.getByRole('textbox', { name: 'Username' }).fill(lead.username);

  // Step 3: Enter password
  await page.getByRole('textbox', { name: 'Password' }).fill(lead.password);

  // Step 4: Click Login
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);

  // Step 5: Click CRM/SFA
  await page.getByRole('link', { name: 'CRM/SFA' }).click();
  await page.waitForTimeout(3000);

  // Step 6: Click Leads
  await page.getByRole('link', { name: 'Leads' }).click();
  await page.waitForTimeout(3000);

  // Step 7: Click Create Lead
  await page.getByRole('link', { name: 'Create Lead' }).click();
  await page.waitForTimeout(3000);

  // Step 8: Fill mandatory fields
  await page.locator('#createLeadForm_companyName').fill(lead.companyName);
  await page.locator('#createLeadForm_firstName').fill(lead.firstName);
  await page.locator('#createLeadForm_lastName').fill(lead.lastName);

  // Step 9: Select 'Direct Mail' from Source dropdown using LABEL
  await page.locator('#createLeadForm_dataSourceId').selectOption({ label: 'Direct Mail' });

  // Step 10: Print all Marketing Campaign dropdown values, then select by VALUE
  const mktgDropdown = page.locator('#createLeadForm_marketingCampaignId');
  const mktgEntries = await mktgDropdown.locator('option').evaluateAll(
    (opts) => opts.map((o) => ({ value: o.value, label: o.textContent?.trim() ?? '' }))
  );
  console.log(`\n--- Marketing Campaign Dropdown ---`);
  console.log(`Total count: ${mktgEntries.length}`);
  for (const entry of mktgEntries) {
    console.log(`  value="${entry.value}" | label="${entry.label}"`);
  }
  // Select 'Demo Marketing Campaign' by VALUE attribute (confirmed value from console output)
  await mktgDropdown.selectOption({ value: 'DEMO_MKTG_CAMP' });

  // Step 11: Select 'General Services' from Industry dropdown using INDEX
  // Index is 0-based; verify the exact index by printing the options if needed
  const industryDropdown = page.locator('#createLeadForm_industryEnumId');
  const industryLabels = await industryDropdown.locator('option').evaluateAll(
    (opts) => opts.map((o) => o.textContent?.trim() ?? '')
  );
  const generalServicesIndex = industryLabels.indexOf('General Services');
  await industryDropdown.selectOption({ index: generalServicesIndex });

  // Step 12: Select INR from Preferred Currency dropdown
  // The option value attribute in opentaps is the ISO currency code (e.g. 'INR')
  await page.locator('#createLeadForm_currencyUomId').selectOption('INR');

  // Step 13: Select India from Country dropdown
  // The address-section country field uses name="primaryCountryGeoId" (no form-prefix ID)
  await page.locator('#createLeadForm_generalCountryGeoId').selectOption('India');
  // Wait for the State dropdown to reload via AJAX after changing the country
  await page.waitForLoadState('networkidle');

  // Step 14: Print all State dropdown values, then select the first available state
  const stateDropdown = page.locator('#createLeadForm_generalStateProvinceGeoId');
  const stateLabels = await stateDropdown.locator('option').evaluateAll(
    (opts) => opts.map((o) => o.textContent?.trim() ?? '')
  );
  console.log(`\n--- State Dropdown (after selecting India) ---`);
  console.log(`Total count: ${stateLabels.length}`);
  for (const label of stateLabels) {
    console.log(`  ${label}`);
  }
  // Select the first non-blank state (index 1 skips any blank placeholder)
  await stateDropdown.selectOption({ index: 1 });

  // Step 15: Click Create Lead
  await page.getByRole('button', { name: 'Create Lead' }).click();
  await page.waitForTimeout(3000);

  console.log(`\nLead created successfully for: ${lead.companyName} - ${lead.firstName} ${lead.lastName}`);
}

// =======================================================================
// DATA FORMAT 1 – JSON file (utils/leadData.json)
// =======================================================================
for (const lead of leadDataJson as LeadData[]) {
  test(`Create Lead [JSON] - ${lead.testId} - ${lead.companyName}`, async ({ page }) => {
    await createLead(page, lead);
  });
}

// =======================================================================
// DATA FORMAT 2 – CSV file (utils/leadData.csv)
// =======================================================================
const csvPath = path.join(__dirname, '..', 'utils', 'leadData.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const csvLeads: LeadData[] = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

for (const lead of csvLeads) {
  test(`Create Lead [CSV] - ${lead.testId} - ${lead.companyName}`, async ({ page }) => {
    await createLead(page, lead);
  });
}

// =======================================================================
// DATA FORMAT 3 – Inline array (hardcoded test data)
// =======================================================================
const inlineLeads: LeadData[] = [
  {
    testId: 'TC005',
    username: 'demoCSR2',
    password: 'crmsfa',
    companyName: 'AILabs Pvt Ltd',
    firstName: 'Karthik',
    lastName: 'Nair',
  },
];

for (const lead of inlineLeads) {
  test(`Create Lead [Inline] - ${lead.testId} - ${lead.companyName}`, async ({ page }) => {
    await createLead(page, lead);
  });
}
