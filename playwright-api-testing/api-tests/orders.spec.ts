import { expect, test } from "@playwright/test";

const orderPayload = {
  customerDetails: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "1234 Main St.",
    city: "Rhyolite",
    zipCode: "89003",
    country: "United States",
  },
  items: [
    {
      productId: "504",
      quantity: 1,
    },
  ],
};

test("create order", async ({ request }) => {
  const orderResponse = await request.post("/orders", {
    data: orderPayload,
  });

  const statusCode = orderResponse.status();
  test.expect(statusCode).toBe(201);

  const orderBody = await orderResponse.json();
  console.log(orderBody);

  // validate order response
  expect(orderBody).toHaveProperty("success", true);
});
