import {test} from "@playwright/test"


test("Learn CSS selectors",async ({page}) => {


await page.goto("http://leaftaps.com/opentaps/control/main")

await page.getByRole('textbox', {name: 'Username'}).fill('Demosalesmanager')
//password
await page.getByRole('textbox', {name: 'Password'}).fill('crmsfa')
//login button
await page.getByRole('button', {name: 'Login'}).click()
//click on CRM/SFA
await page.getByRole('link', {name: 'CRM/SFA'}).click()
await page.waitForTimeout(7000)
//click on Leads
await page.getByRole('link', {name: 'Leads'}).click()
await page.waitForTimeout(7000)

//click on create lead
await page.getByRole('link', {name: 'Create Lead'}).click()
await page.waitForTimeout(7000)
//fill company name
await page.locator('#createLeadForm_companyName').fill('Google')
//fill first name
await page.locator('#createLeadForm_firstName').fill('Muthu')
//fill last name
await page.locator('#createLeadForm_lastName').fill('Rajendiran')
//fill salutation
await page.locator('#createLeadForm_personalTitle').fill('Mr')
//fill title
await page.locator('#createLeadForm_generalProfTitle').fill('Software Engineer')
//fill Annual Revenue
await page.locator('#createLeadForm_annualRevenue').fill('10000000')
//fill department
await page.locator('#createLeadForm_departmentName').fill('SDET')
// fill the phone number
await page.locator('#createLeadForm_primaryPhoneNumber').fill('1234567890');
//click on create lead button
await page.getByRole('button', {name: 'Create Lead'}).click()
await page.waitForTimeout(5000)
})