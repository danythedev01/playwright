import { test, expect } from "@playwright/test";

test("should fetch the list of products", async ({ request }) => {
  const response = await request.get("/products");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const products = await response.json();
  expect(products).toHaveProperty("success", true);
  console.log(products);
  expect(Array.isArray(products.data)).toBe(true);
  expect(products.data.length).toBeGreaterThan(0);
});
