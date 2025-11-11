import { test } from "@playwright/test";

// npx playwright codegen

// directly open address in codegen:
// npx playwright codegen localhost:5000
test("CodeGen test", async ({ page }) => {
  await page.goto("http://localhost:5000/");

  await page.getByText("Corporate Events").click();
  await page.getByText("Wedding Planning").click();
});

test("Codegen daniel test", async ({ page }) => {
  await page.goto("http://localhost:5000/");
  await page.getByText("Concerts and Festivals").click();
  await page.getByTestId("accept-cookies").click();
  await page.getByRole("link", { name: "Go to Feedback Form" }).click();
  await page.getByRole("textbox", { name: "Name (required):" }).click();
  await page.getByRole("textbox", { name: "Name (required):" }).fill("Daniel");
  await page.getByRole("button", { name: "Submit" }).click();
});
