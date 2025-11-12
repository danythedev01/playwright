import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // playwright will launch multiple workers to execute the tests
  fullyParallel: true,
  // recomended: half the amount of procesors inside of the running machine
  // workers: 3,
  // 75% the processors
  workers: "75%",
  // this will run all the tests that have Form in their description
  // grep: /Form/,
  reporter: "html",
  webServer: {
    command: "npm start",
    url: "http://localhost:5000/",
    reuseExistingServer: true,
  },
  // provides option for the specific brower we use for this test
  use: {
    baseURL: "http://localhost:5000/",
    headless: false,
    // British english
    locale: "en-GB",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["auth-setup"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["auth-setup"],
    },
    {
      name: "auth-setup",
      testMatch: "tests/setup/Auth.setup.ts",
    },
  ],
});
