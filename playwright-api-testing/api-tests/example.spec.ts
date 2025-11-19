import { test, expect, APIRequestContext } from "@playwright/test";

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: "https://api.valentinos-magic-beans.click",
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test("test request", async () => {
  const newOrderResponse = await apiContext.post("/orders");
  console.log(newOrderResponse);
});
