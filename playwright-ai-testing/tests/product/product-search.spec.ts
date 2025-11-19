import test, { expect } from "playwright/test";

test("product search returns results", async ({ page }) => {
  await page.goto("/");
  // Replace selectors and actions with your app's details
  await page.fill('input[placeholder="Search products"]', "Magic Beans");
  await page.click("button:search");
  await expect(page.locator("text=Magic Beans")).toBeVisible();
});
