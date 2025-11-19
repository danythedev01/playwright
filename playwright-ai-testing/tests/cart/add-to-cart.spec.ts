import { test, expect } from '@playwright/test';

test('should add item to cart', async ({ page }) => {
  await page.goto('/');
  // Replace selectors and actions with your app's details
  await page.click('text=Product 1');
  await page.click('button:add-to-cart');
  await page.goto('/cart');
  await expect(page.locator('text=Product 1')).toBeVisible();
});
