import {expect, test} from "@playwright/test"


test("Learn Assertion",async ({page}) => {


await page.goto("https://leafground.com/input.xhtml")
const locator =page.getByPlaceholder('Disabled', {exact: true})
await expect(locator).toBeDisabled()
const nameField = page.getByPlaceholder('Babu Manickam', {exact: true})
await expect(nameField).toBeEditable()
//soft assertion
await expect.soft(locator).toBeDisabled()
nameField.clear()
nameField.fill("Playwright Learning")

})