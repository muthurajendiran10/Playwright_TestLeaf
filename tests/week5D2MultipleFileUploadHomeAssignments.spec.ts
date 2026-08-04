import { test, expect } from "@playwright/test";
import path from "path";

// Week 5 Day 2 - Multiple File Upload using setInputFiles()
// Steps:
// 1. Navigate to LeafGround file upload page
// 2. Navigate to the Advanced Upload section
// 3. Upload two image files using setInputFiles() with an array
// 4. Verify both files are selected/uploaded successfully

test("LeafGround - Upload Multiple Image Files using Advanced Upload", async ({ page }) => {

  // Step 1: Navigate to the LeafGround file upload page
  await page.goto("https://www.leafground.com/file.xhtml");

  // Step 2: Scroll to the Advanced Upload section
  await page.getByText("Advanced").scrollIntoViewIfNeeded();

  // Step 3: Locate the hidden file input inside the Advanced Upload section
  const advancedUploadInput = page.locator("//h5[contains(text(),'Advanced Upload')]//following::input[@type='file'][1]");
  // Step 4: Upload two image files using setInputFiles() with an array
  const file1 = path.join(__dirname, "../fixtures/image1.png");
  const file2 = path.join(__dirname, "../fixtures/image2.png");

  await advancedUploadInput.setInputFiles([file1, file2]);

  console.log("Two image files uploaded successfully using setInputFiles()");

  // Step 5: Verify both files are uploaded - check file names appear in the UI
  await expect(page.getByText("image1.png")).toBeVisible();
  await expect(page.getByText("image2.png")).toBeVisible();

  console.log("Verified: Both image files are listed in the uploaded files section");
});
