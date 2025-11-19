import { test, expect } from "@playwright/test";

// Helper to generate a random guest email
function randomEmail() {
  return `guest_${Math.floor(Math.random() * 100000)}@example.com`;
}

test("Guest can order Brazilian Santos and verify order", async ({ page }) => {
  // Step 1: Go to homepage
  await page.goto("https://valentinos-magic-beans.click/");

  // Step 2: Go to products/shop page
  await page.click('a:has-text("Shop")');

  // Step 3: Find "Brazilian Santos" and get its price
  const productCard = page
    .locator("text=Brazilian Santos")
    .first()
    .locator("..");
  const priceLocator = productCard.locator(".font-bold");
  const price = await priceLocator.textContent();
  await productCard.click();

  // Step 4: Add to cart
  await page.click('button:has-text("Add to Cart")');

  // Step 5: Go to cart

  const goToCartButton = await page
    .locator('[data-test-id="header-cart-button"]')
    .getByRole("button");

  await goToCartButton.click();

  // await expect(page.locator("text=Brazilian Santos")).toBeVisible();
  // const priceInCart = await page
  //   .locator("text=Brazilian Santos")
  //   .locator("..")

  await expect(
    page.getByRole("heading", { name: "Brazilian Santos" })
  ).toBeVisible();

  // await expect(page.locator("text=" + price)).toBeVisible();

  // Step 6: Proceed to checkout
  await page.click('button:has-text("Checkout")');

  // Step 6.1: Provide contact information
  /* 
    firstName
    lastName
  */

  // Step 7: Fill guest checkout form
  const email = randomEmail();
  await page.fill('input[name="firstName"]', "Daniel");
  await page.fill('input[name="lastName"]', "Azamar");
  await page.fill('input[type="email"]', email);
  await page.fill('input[name="address"]', "123 Main St");
  await page.fill('input[name="city"]', "Coffeeville");
  await page.fill('input[name="zipCode"]', "12345");
  await page.click('button:has-text("Place Order")');

  // This test was generated with copilot agent just to demonstrate capabilities.
  // Below code is not working as there are some lines missing; however, it just need to be fixed with correct selectors and logic.
  // Step 8: Capture order ID and confirmation
  const orderId = await page.locator("text=Order ID").textContent();
  expect(orderId).toBeTruthy();

  // Step 9: Go to order status page (assume link or /orders/{id})
  // If confirmation page provides a link, follow it; else, construct URL
  const statusLink = await page
    .locator('a:has-text("Order Status")')
    .getAttribute("href");
  if (statusLink) {
    await page.goto(statusLink);
  } else if (orderId) {
    await page.goto(`https://valentinos-magic-beans.click/orders/${orderId}`);
  }

  // Step 10: Verify order details
  await expect(page.locator("text=Brazilian Santos")).toBeVisible();
  await expect(page.locator("text=" + price)).toBeVisible();
  await expect(page.locator("text=" + email)).toBeVisible();
});
