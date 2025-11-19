# Playwright E-Commerce Testing Project

This project uses [Playwright](https://playwright.dev/) with TypeScript to test an e-commerce application.

## Project Structure

- `tests/cart/` - Cart feature tests
- `tests/checkout/` - Checkout feature tests
- `tests/product/` - Product feature tests
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install -D @playwright/test typescript
   npx playwright install
   ```
2. **Run tests:**
   ```sh
   npx playwright test
   ```
3. **Write tests:**
   Add `.spec.ts` files in the relevant `tests/` subfolders.

## Example Test
See the `tests/cart/` folder for a sample test file.

## Configuration
- Update `baseURL` in `playwright.config.ts` to match your app's URL.

---

Replace placeholder tests and configuration as needed for your application.
