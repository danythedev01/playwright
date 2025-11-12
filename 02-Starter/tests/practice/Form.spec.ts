import { test, expect, Page } from "@playwright/test";
const someName = "Alex";
const someEmail = "alex@email.com";
const someComment = "Awesome!";
const someHighlights = "Dance session";

async function clickButton(
  page: Page,
  buttonName: "Submit" | "Save" | "Clear"
) {
  await page
    .getByRole("button", {
      name: buttonName,
    })
    .click();
}

async function completeFields(page: Page) {
  const nameLabel = page.getByLabel("name");
  await nameLabel.fill(someName);

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill(someEmail);

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill(someComment);

  const highlightsLabel = page.getByLabel("highlights");
  await highlightsLabel.fill(someHighlights);

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();
}

async function checkIfItemsNotEmpty(page: Page) {
  const nameLabel = page.getByLabel("name");

  const emailLabel = page.getByLabel("email");
  const commentLabel = page.getByLabel("comment");
  const highlightsLabel = page.getByLabel("highlights");
  const checkbox = page.getByRole("checkbox", {
    name: "I agree",
  });
  await expect(nameLabel).toHaveValue(someName);
  await expect(emailLabel).toHaveValue(someEmail);
  await expect(commentLabel).toHaveValue(someComment);
  await expect(highlightsLabel).toHaveValue(someHighlights);
  await expect(checkbox).toBeChecked();
}

async function checkIfItemsEmpty(page: Page) {
  console.log("test 3");
  const nameLabel = page.getByLabel("name");

  const emailLabel = page.getByLabel("email");

  const commentLabel = page.getByLabel("comment");

  const highlightsLabel = page.getByLabel("highlights");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });

  const a = 2;
  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(highlightsLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
}

test("Form is submitted with required fields", async ({ page }) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");

  await completeFields(page);

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();

  expect(formSubmitted).toBeTruthy();
});

test("Form is submitted with required fields - form is cleared after submit", async ({
  page,
}) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");

  await completeFields(page);

  // await page
  //   .getByRole("button", {
  //     name: "Submit",
  //   })
  //   .click();
  await clickButton(page, "Submit");

  expect(formSubmitted).toBeTruthy();
  await checkIfItemsEmpty(page);
});

test("Form is NOT submitted without minimal fields", async ({ page }) => {
  let formSubmitted = false;

  page.on("dialog", (dialog) => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto("FeedBackForm.html");

  const nameLabel = page.getByLabel("name");
  await nameLabel.fill("Alex");

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill("Awesome!");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();

  expect(formSubmitted).toBeFalsy();
});

test("Form is NOT submitted if user selects NO on dialog", async ({ page }) => {
  page.on("dialog", (dialog) => {
    dialog.dismiss();
  });

  await page.goto("FeedBackForm.html");

  const nameLabel = page.getByLabel("name");
  await nameLabel.fill("Alex");

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill("alex@email.com");

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill("Awesome!");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  await page
    .getByRole("button", {
      name: "Submit",
    })
    .click();

  // check if form is NOT cleared:
  await expect(nameLabel).toHaveValue("Alex"); // DO not use toHaveText, it's not working
  await expect(emailLabel).toHaveValue("alex@email.com");
  await expect(commentLabel).toHaveValue("Awesome!");
  await expect(checkBox).toBeChecked();
});

// clear progress tests:
test("Form is completed - clear button clears inputs", async ({ page }) => {
  page.on("dialog", (dialog) => {
    dialog.accept();
  });

  await page.goto("FeedBackForm.html");

  const nameLabel = page.getByLabel("name");
  await nameLabel.fill("Alex");

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill("alex@email.com");

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill("Awesome!");

  const highlightsLabel = page.getByLabel("highlights");
  await commentLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  await page
    .getByRole("button", {
      name: "Clear",
    })
    .click();

  // check if form is cleared:
  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(highlightsLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
});

test("Form is completed - clear button clears memory", async ({ page }) => {
  page.on("dialog", (dialog) => {
    dialog.accept();
  });

  await page.goto("FeedBackForm.html");

  const nameLabel = page.getByLabel("name");
  await nameLabel.fill("Alex");

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill("alex@email.com");

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill("Awesome!");

  const highlightsLabel = page.getByLabel("highlights");
  await highlightsLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  await page
    .getByRole("button", {
      name: "Save",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Clear",
    })
    .click();

  await page.reload();

  // check if form is cleared:
  await expect(nameLabel).toBeEmpty();
  await expect(emailLabel).toBeEmpty();
  await expect(commentLabel).toBeEmpty();
  await expect(highlightsLabel).toBeEmpty();
  await expect(checkBox).not.toBeChecked();
});

test("Form is completed - clear button does not clear inputs if dialog rejected", async ({
  page,
}) => {
  page.on("dialog", (dialog) => {
    dialog.dismiss();
  });

  await page.goto("FeedBackForm.html");

  const nameLabel = page.getByLabel("name");
  await nameLabel.fill("Alex");

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill("alex@email.com");

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill("Awesome!");

  const highlightsLabel = page.getByLabel("highlights");
  await highlightsLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  await page
    .getByRole("button", {
      name: "Clear",
    })
    .click();

  // check if form is NOT cleared:
  await expect(nameLabel).toHaveValue("Alex");
  await expect(emailLabel).toHaveValue("alex@email.com");
  await expect(commentLabel).toHaveValue("Awesome!");
  await expect(checkBox).toBeChecked();
});

test("Form is completed - save data button saves data", async ({ page }) => {
  page.on("dialog", (dialog) => {
    dialog.accept();
  });

  await page.goto("FeedBackForm.html");

  const nameLabel = page.getByLabel("name");
  await nameLabel.fill("Alex");

  const emailLabel = page.getByLabel("email");
  await emailLabel.fill("alex@email.com");

  const commentLabel = page.getByLabel("comment");
  await commentLabel.fill("Awesome!");

  const highlightsLabel = page.getByLabel("highlights");
  await highlightsLabel.fill("Dance session");

  const checkBox = page.getByRole("checkbox", { name: "I agree" });
  await checkBox.check();

  await page
    .getByRole("button", {
      name: "Save",
    })
    .click();

  await page.reload();

  // check if form is NOT cleared:
  await expect(nameLabel).toHaveValue("Alex");
  await expect(emailLabel).toHaveValue("alex@email.com");
  await expect(commentLabel).toHaveValue("Awesome!");
  await expect(checkBox).toBeChecked();
});
