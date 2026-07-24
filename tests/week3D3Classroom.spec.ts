import {test} from "@playwright/test"


test("Playwright locators",async ({page}) => {


await page.goto("https://leaftaps.com/opentaps/control/main")
//username
await page.getByLabel('Username',{exact:true}).first().fill('democsr2')
//password
await page.getByLabel('Password',{exact:true}).first().fill('crmsfa')
//login button
await page.getByRole('button',{name:'Login'}).click()
//verify home page
await page.getByRole('link',{name:'CRM/SFA'}).isVisible()
    
})