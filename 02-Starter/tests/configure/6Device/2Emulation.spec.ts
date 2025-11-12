import { test, devices } from "@playwright/test";

// const iphone = devices['iPhone 13 Pro']
// using a samsung device as iPhone device uses webkit and that's disabled due to compatibility issues
const galaxy9plus = devices["Galaxy S9+"];

const latestIphoneSize = {
  width: 400,
  height: 200,
};

test.use({
  baseURL: "",
  ...galaxy9plus,
  viewport: latestIphoneSize,
});

test("Observe window", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.pause();
});
