import { test, chromium } from "@playwright/test";

// Fixtures: A test fixture is a fixed state of a set of objects used as a baseline for running tests. Isolated between tests
//    fixed or prepared components needed for reliable testing
/* 
  the arguments of the test function are fixtures
    page: context of an isolated instance
*/
test("Close cookies", async ({ page }) => {
  await page.goto("https://udemy.com/");
  const okButton = await page.getByRole("button", { name: "OK", exact: true });
  okButton.click();
});

test("Is the cookie banner still present?", async ({ page }) => {
  await page.goto("https://udemy.com/");
  await page.pause();
});

test("Browser fixture", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://udemy.com/");
});

test("Create page manually", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://udemy.com/");
});
