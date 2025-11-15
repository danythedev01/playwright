import { test, expect } from "@playwright/test";
import {
  addProductToCart,
  assertProduct,
  getSubTotal,
} from "../pages/Products";
import * as checkout from "../pages/Checkout";

import * as contact from "../pages/Contact";

test("Item is added to the shopping cart", async ({ page }) => {
  await page.goto("https://valentinos-magic-beans.click/products");

  const { name: firstProductName, price: firstProductPrice } =
    await addProductToCart(page, 1);

  await assertProduct(page, firstProductName!);

  await page
    .locator('[data-test-id="header-cart-button"]')
    .getByRole("button")
    .click();

  const subtotal = await getSubTotal(page);
  const actualSubtotal = Number(firstProductPrice);
  expect(actualSubtotal).toEqual(subtotal);
});

test("Complete workflow for product order", async ({ page }) => {
  await page.goto("/products");
  const addedProduct = await addProductToCart(page, 1);

  await page
    .locator('[data-test-id="header-cart-button"]')
    .getByRole("button")
    .click();

  await assertProduct(page, addedProduct.name!);

  const subTotal = await getSubTotal(page);

  expect(subTotal).toBe(addedProduct.price);

  await page.getByRole("button", { name: "Proceed to Checkout" }).click();

  await checkout.addContactInfo(page);
  await checkout.addPaymentInfo(page);
  await checkout.addShippingAddress(page);
  await checkout.placeOrder(page);

  // Get orderId
  const orderWrapper = page.getByText("Your Order ID is:").locator("..");
  const orderId = await orderWrapper
    .getByRole("paragraph")
    .nth(1)
    .textContent();
  console.log({ orderId });

  // open the contact page
  await page
    .getByRole("button", {
      name: "Track Your Order",
    })
    .click();

  await contact.fillOrderIdAndEmail(page, orderId!, checkout.testValues.email);
  await contact.clickTrackOrder(page);

  // check if ordered item is returned:
  const firstOrder = page.getByText(addedProduct.name!);
  await expect(firstOrder).toBeVisible();
});

test("Complete workflow for product order with steps", async ({ page }) => {
  await page.goto("/products");

  // getting the types from the built in generic return type
  // Awaited convert from a promise of a type to the actual type
  let addedProduct: Awaited<ReturnType<typeof addProductToCart>> = {} as any;

  await test.step("add product to cart", async () => {
    addedProduct = await addProductToCart(page, 1);
  });

  await test.step("go to checkout page", async () => {
    await page
      .locator('[data-test-id="header-cart-button"]')
      .getByRole("button")
      .click();

    await page.getByRole("button", { name: "Proceed to Checkout" }).click();
  });

  await test.step("complete checkout information", async () => {
    await checkout.addContactInfo(page);
    await checkout.addPaymentInfo(page);
    await checkout.addShippingAddress(page);
    await checkout.placeOrder(page);
  });

  let orderId: string | null;

  await test.step("get order id", async () => {
    // Get orderId
    const orderWrapper = page.getByText("Your Order ID is:").locator("..");
    orderId = await orderWrapper.getByRole("paragraph").nth(1).textContent();
    console.log({ orderId });
  });

  await test.step("open the contact page", async () => {
    // open the contact page
    await page
      .getByRole("button", {
        name: "Track Your Order",
      })
      .click();

    await contact.fillOrderIdAndEmail(
      page,
      orderId!,
      checkout.testValues.email
    );
    await contact.clickTrackOrder(page);
  });

  await test.step("check if order item is returned", async () => {
    // check if ordered item is returned:
    const firstOrder = page.getByText(addedProduct.name!);
    await expect(firstOrder).toBeVisible();
  });
});

/*
test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('/products');

    const firstProductWrapper = page.locator('.p-6').first()
    const firstProductName = await firstProductWrapper.getByRole('heading').first().textContent()
    const firstProductPrice = await firstProductWrapper.locator('.font-bold').textContent()
    const firstButton = firstProductWrapper.getByRole('button', {
        name: 'Add to Cart'
    })

    await firstButton.click()
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    // assert first product name
    const firstProductHeading = page.getByRole('heading', {
        name: firstProductName!
    })
    await expect(firstProductHeading).toBeVisible()

    // assert subtotal:
    const subTotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold')
    const subtotal = await subTotalWrapper.textContent();
    const expectedSubtotal = Number(subtotal?.substring(1))
    const actualSubtotal = Number(firstProductPrice?.substring(1))
    expect(actualSubtotal).toEqual(expectedSubtotal)

})
    */
