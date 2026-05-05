const { test, expect } = require("@playwright/test");

test("calculator supports required operations", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173");

  for (const label of ["8", "+", "2", "="]) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await expect(page.locator("output")).toHaveText("10");

  await page.getByRole("button", { name: "C", exact: true }).click();
  for (const label of ["9", "-", "4", "="]) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await expect(page.locator("output")).toHaveText("5");

  await page.getByRole("button", { name: "C", exact: true }).click();
  for (const label of ["6", "×", "7", "="]) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await expect(page.locator("output")).toHaveText("42");

  await page.getByRole("button", { name: "C", exact: true }).click();
  for (const label of ["9", "÷", "3", "="]) {
    await page.getByRole("button", { name: label, exact: true }).click();
  }
  await expect(page.locator("output")).toHaveText("3");
});
