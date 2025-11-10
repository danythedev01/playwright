import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  // Triple A principle:
  /* 
    Arrange
    Act
    Assert
  */

  // ARRANGE
  await page.goto("https://playwright.dev/");

  // ACT
  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // ASSERT
  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
