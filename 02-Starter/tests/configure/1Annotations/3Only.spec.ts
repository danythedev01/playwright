import { test, expect } from "@playwright/test";

test("Test 1", () => {
  console.log("test 1");
});

// using "only" will make playwright only to run this test - it refers to the whole testing suite, not only this single file
// test.only("Test 2", () => {
test("Test 2", () => {
  console.log("test 2");
});

test("Test 3", () => {
  console.log("test 3");
});

test("Test 4", () => {
  console.log("test 4");
});
