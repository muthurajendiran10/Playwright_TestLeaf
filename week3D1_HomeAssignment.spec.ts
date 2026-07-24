import {test} from "@playwright/test"


test("Learn CSS selectors",async ({page}) => {


await page.goto("http://leaftaps.com/opentaps/control/main")

await page.locator('#username').fill('democsr2')
//password
await page.locator('#password').fill('crmsfa')
//login button
await page.locator('input[value="Login"]').click()
//click on CRM/SFA
await page.locator('div > a > img').click()
await page.waitForTimeout(5000)
//click on Leads
await page.locator('a[href="/crmsfa/control/leadsMain"]').click()
//click on create lead
await page.locator('a[href="/crmsfa/control/createLeadForm"]').click()
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
// handling source dropdown to print all the values
const sourceDropdown = await page.locator('#createLeadForm_dataSourceId option').allInnerTexts()
for(const option of sourceDropdown){
    console.log(option)
}
// fill the phone number
await page.locator('#createLeadForm_primaryPhoneNumber').fill('1234567890');
//click on create lead button
await page.locator('input[value="Create Lead"]').click()
await page.waitForTimeout(5000)

    
})