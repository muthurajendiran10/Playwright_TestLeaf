import { test, expect } from "@playwright/test";

test("Handle confirm alert and verify OK response", async ({ page }) => {
  await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");

  page.once("dialog", async (alert) => {
    const alertType = alert.type();
    console.log("Alert type:", alertType);

    const alertMessage = alert.message();
    console.log("Alert message:", alertMessage);

    await alert.accept();
  });

  const frame = page.frameLocator("#iframeResult");
  await frame.locator("button").click();

  const resultText = await frame.locator("#demo").textContent();
  console.log("Result text:", resultText);

  await expect(frame.locator("#demo")).toHaveText("You pressed OK!");
});
