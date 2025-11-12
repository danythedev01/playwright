import { test, expect } from "@playwright/test";

test.beforeAll(async () => {
  console.log("Before all action");
  await new Promise((r) => setTimeout(r, 1000));
});

test.beforeEach(async ({ page }) => {
  console.log("Before each action");
  await page.goto("");
});

test("Test 1", () => {
  console.log("Running test 1");
});

test("Test 2", () => {
  console.log("Running test 2");
});

test.afterEach(() => {
  console.log("After each action");
});

test.afterAll(() => {
  console.log("After all action");
});

test("Get by Role practice - heading", async ({ page }) => {
  const servicesHeading = page.getByRole("heading", {
    // name means "accesible name", from user eyes
    // this is often ignorecase, we can force case sensitive, we can use <exact>
    name: "our services",
  });

  await expect(servicesHeading).toBeVisible();

  const servicesText = await servicesHeading.textContent();
  console.log(servicesText);
});

test("Get by Role - list", async ({ page }) => {
  const servicesList = page.getByRole("list");
  await expect(servicesList).toBeVisible();

  // Locators are chainable
  const serviceItems = await servicesList.getByRole("listitem").all();

  for (const item of serviceItems) {
    const itemText = await item.textContent();
    expect(itemText).toBeTruthy();
  }
});
