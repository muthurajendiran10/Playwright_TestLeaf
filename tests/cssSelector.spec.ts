import {test} from "@playwright/test"


test("Learn CSS selectors",async ({page}) => {


await page.goto("https://login.salesforce.com/?locale=in")

await page.locator('#username').fill('dilipkumar.rajendran@testleaf.com')
//password
await page.locator('#password').fill('TestLeaf@2025')
//login button
await page.locator('input[id="Login"]').click()
//verify salesforce home page
await page.locator('a[title="Home"]').isVisible()
    
})