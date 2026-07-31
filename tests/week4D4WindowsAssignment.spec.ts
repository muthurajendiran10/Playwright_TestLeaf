import { test, expect } from "@playwright/test";

// Assignment: Browser Window Handling
// 1. Navigate to https://www.leafground.com/window.xhtml
// 2. Click "Open" to launch a child window
// 3. Switch to child window, enter email, close child window
// 4. Switch back to parent window
// 5. Click "Open Multiple" and print total number of open windows

test("Handle parent and child browser windows", async ({ browser }) => {
  const context = await browser.newContext();
  const parentPage = await context.newPage();

  // Step 1: Navigate to the window handling page
  await parentPage.goto("https://www.leafground.com/window.xhtml");

  // Step 2: Click the "Open" button to launch a new child window
  const [childPage] = await Promise.all([
    context.waitForEvent("page"),
    parentPage.locator("//button[normalize-space()='Open']").click(),
  ]);

  // Step 3: Switch control to the newly opened child window
  await childPage.waitForLoadState();
  console.log("Child window URL:", childPage.url());

  // Step 4: Locate the Email text box and enter a valid email address
  await childPage.locator("input[id='email']").fill("testleaf@example.com");

  // Step 5: Close the child window
  await childPage.close();
  console.log("Child window closed.");

  // Step 6: Switch control back to the parent window
  await parentPage.bringToFront();
  console.log("Switched back to parent window:", parentPage.url());

  // Step 7: Click on the "Open Multiple" button
  const newPages = await Promise.all([
    context.waitForEvent("page"),
    parentPage.locator("//button[normalize-space()='Open Multiple']").click(),
  ]);

  // Wait briefly for all windows to open
  await parentPage.waitForTimeout(2000);

  // Step 8: Print the total number of opened windows in the console
  const allPages = context.pages();
  console.log("Total number of open browser windows:", allPages.length);

  await context.close();
});
