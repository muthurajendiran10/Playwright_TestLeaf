import { test } from "@playwright/test";

test("page fixture", async ({page}) => {

await page.goto("https://www.google.com/");
console.log(await page.title());

});