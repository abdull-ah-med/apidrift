import { expect, test } from "@playwright/test";

test("landing shows APIDrift brand and workspace CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("APIDrift").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /open workspace/i }).first()).toBeVisible();
});

test("workspace runs a semantic diff and shows results", async ({ page }) => {
  await page.goto("/app");
  await page.getByRole("button", { name: /^json$/i }).click();
  await page.locator("#tour-run").click();
  await expect(page.getByText(/breaking/i).first()).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("#tour-results")).toBeVisible();
});
