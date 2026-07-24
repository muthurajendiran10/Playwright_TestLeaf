import { test, expect, chromium, webkit } from '@playwright/test';

test('Load RedBus in Edge and verify title and URL', async () => {
  test.setTimeout(60000);

  // Launch Microsoft Edge browser (suppress first-run/sign-in dialogs)
  const edgeBrowser = await chromium.launch({
    channel: 'msedge',
    headless: false,
    args: ['--no-first-run', '--no-default-browser-check', '--disable-extensions'],
  });
  const edgeContext = await edgeBrowser.newContext();
  const edgePage = await edgeContext.newPage();

  // Navigate to RedBus using domcontentloaded to avoid load-event timeouts
  await edgePage.goto("https://www.redbus.in", { waitUntil: 'domcontentloaded' });

  const redBusTitle = await edgePage.title();
  const redBusUrl = edgePage.url();

  console.log('RedBus Title:', redBusTitle);
  console.log('RedBus URL  :', redBusUrl);

  // Verify title contains 'redbus' (case-insensitive)
  expect(redBusTitle.toLowerCase()).toContain('redbus');

  // Verify URL contains the expected domain
  expect(redBusUrl).toContain('redbus.in');

  await edgeBrowser.close();
});

test.only('Load Flipkart in Webkit and verify title and URL', async () => {
  test.setTimeout(60000);

  // Launch Webkit browser
  const webkitBrowser = await webkit.launch({ headless: false });
  const webkitContext = await webkitBrowser.newContext();
  const webkitPage = await webkitContext.newPage();

  // Navigate to Flipkart using domcontentloaded to avoid load-event timeouts
  await webkitPage.goto("https://www.flipkart.com/", { waitUntil: 'domcontentloaded' });

  const flipkartTitle = await webkitPage.title();
  const flipkartUrl = webkitPage.url();

  console.log('Flipkart Title:', flipkartTitle);
  console.log('Flipkart URL  :', flipkartUrl);

  // Verify title contains 'flipkart' (case-insensitive)
  expect(flipkartTitle.toLowerCase()).toContain("online shopping site for mobiles, electronics, furniture, grocery, lifestyle, books & more. best offers!");

  // Verify URL contains the expected domain
  expect(flipkartUrl).toContain("flipkart.com");

  await webkitBrowser.close();
});

