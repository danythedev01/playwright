import { test, expect } from "@playwright/test";

test("Get by test id - accept cookies", async ({ page }) => {
  await page.goto("");
  // downside: using this goes again the direct user approach that the other locators take
  //
  const acceptCookiesButton = page.getByTestId("accept-cookies");
  const declineCookiesButton = page.getByTestId("decline-cookies");

  /* 
    data-testid: by default, this is the attribute for searching. You can use a custom attribue by:
        testIdAttribute: 'your-attribute'
  */

  await acceptCookiesButton.click();
  await expect(acceptCookiesButton).not.toBeVisible();
  await expect(declineCookiesButton).not.toBeVisible();
});

test("Get by test id - decline cookies", async ({ page }) => {
  await page.goto("");

  const acceptCookiesButton = page.getByTestId("accept-cookies");
  const declineCookiesButton = page.getByTestId("decline-cookies");

  await declineCookiesButton.click();
  await expect(acceptCookiesButton).not.toBeVisible();
  await expect(declineCookiesButton).not.toBeVisible();
});
