import { expect, type Page } from "@playwright/test";

export async function getSubTotal(page: Page) {
  const subTotalWrapper = page
    .getByText("Subtotal")
    .locator("..")
    .locator(".font-semibold");
  const subTotal = await subTotalWrapper.textContent();
  return Number(subTotal?.substring(1));
}

export async function assertProduct(page: Page, heading: string) {
  const firstProductHeading = await page.getByRole("heading", {
    name: heading,
  });

  await expect(firstProductHeading).toBeVisible();
}

export async function addProductToCart(page: Page, index: number) {
  const productWrapper = page.locator(".p-6").nth(index);
  const productName = await productWrapper
    .getByRole("heading")
    .first()
    .textContent();

  const productPrice = await productWrapper.locator(".font-bold").textContent();

  const firstButton = productWrapper.getByRole("button", {
    name: "Add to cart",
  });

  await firstButton.click();
  return {
    name: productName,
    price: Number(productPrice?.substring(1)),
  };

  // const productWrapper = page.locator('.p-6').nth(index)
  // const productName = await productWrapper.getByRole('heading').first().textContent()
  // const productPrice = await productWrapper.locator('.font-bold').textContent()
  // const firstButton = productWrapper.getByRole('button', {
  //     name: 'Add to Cart'
  // })
  // await firstButton.click()
  // return {
  //     name: productName,
  //     price: Number(productPrice?.substring(1))
  // }
}
