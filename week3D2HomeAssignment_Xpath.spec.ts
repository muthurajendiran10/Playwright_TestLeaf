import {test, expect} from "@playwright/test"


test("Learn CSS selectors",async ({page}) => {


await page.goto("https://login.salesforce.com/?locale=in")

await page.locator('//form[@id="login_form"]/descendant::input[@id="username"]').fill('dilipkumar.rajendran@testleaf.com')
//password
await page.locator('//form[@id="login_form"]/child::input[@id="password"]').fill('TestLeaf@2025')
//login button
await page.locator('//form[@id="login_form"]/child::input[@id="Login"]').click()
await page.waitForTimeout(5000)
//click on App Launcher
await page.locator('//button[@title="App Launcher"]').click()
await page.waitForTimeout(2000)
//click on view All
await page.locator('//button[@aria-label="View All Applications"]').click()
//search for accounts
await page.locator('//input[@placeholder="Search apps or items..."]').click()
await page.locator('//input[@placeholder="Search apps or items..."]').fill('Accounts')
await page.locator('//input[@placeholder="Search apps or items..."]').press('Enter')
//click on accounts
await page.locator('//mark[text()="Accounts"]').click()
//click on New button
await page.locator('//a[@title="New"]').click()
//Enter valid account name
const accountName = "Sdet"
await page.locator('//input[@name="Name"]').fill(accountName)
//select type
await page.locator('//button[@aria-label="Type"]').click()
await page.locator('//span[text()="Competitor"]').click()
//select industry
await page.locator('//button[@aria-label="Industry"]').click()
await page.locator('//span[text()="Apparel"]').click()
//click on save button
await page.locator('//button[@name="SaveEdit"]').click()
//verify new account created
const actualAccountName = await page.locator(`//lightning-formatted-text[text()="${accountName}"]`).textContent();
expect(actualAccountName).toEqual(accountName)

})