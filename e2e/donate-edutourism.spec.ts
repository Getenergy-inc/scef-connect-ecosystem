import { test, expect } from "@playwright/test";
import {
  paymentPurposes,
  accountGroupById,
} from "../src/config/officialAccounts";

/**
 * Verifies that selecting “EduTourism Mission” on /donate:
 * 1. Routes the recommendation card to EduAid-Africa
 * 2. Shows the EduAid-Africa Providus bank accounts section
 * 3. Displays all four currency accounts with correct numbers
 * 4. Renders the correct CTA link to /programs/edutourism-missions
 */

const eduaidGroup = accountGroupById("eduaid");
const expectedAccounts: Record<string, string> = {
  NGN: "1305744507",
  USD: "1307264500",
  EUR: "1307264531",
  GBP: "1307264548",
};

test.describe("/donate routing — EduTourism Mission", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/donate");
  });

  test("selecting EduTourism Mission routes recommendation to EduAid-Africa", async ({ page }) => {
    await page
      .getByRole("button", { name: "EduTourism Mission", exact: true })
      .click();

    const recommendation = page.locator("text=please pay into the").locator("..");
    await expect(recommendation).toBeVisible();

    await expect(recommendation).toContainText(eduaidGroup.shortName);
    await expect(
      recommendation.getByRole("link", {
        name: new RegExp(`${eduaidGroup.shortName} Bank`, "i"),
      }),
    ).toHaveCount(1);
  });

  test("EduAid-Africa Providus bank accounts section is visible", async ({ page }) => {
    await page
      .getByRole("button", { name: "EduTourism Mission", exact: true })
      .click();

    const eduaidSection = page.locator(`#account-${eduaidGroup.id}`);
    await expect(eduaidSection).toBeVisible();

    // Verify group heading
    await expect(eduaidSection).toContainText(eduaidGroup.name);
    await expect(eduaidSection).toContainText(eduaidGroup.bank);
    await expect(eduaidSection).toContainText("Verified Account");
  });

  test("all four Providus bank account numbers are displayed", async ({ page }) => {
    await page
      .getByRole("button", { name: "EduTourism Mission", exact: true })
      .click();

    const eduaidSection = page.locator(`#account-${eduaidGroup.id}`);
    await expect(eduaidSection).toBeVisible();

    for (const [currency, number] of Object.entries(expectedAccounts)) {
      const row = eduaidSection.locator("tr", {
        hasText: new RegExp(`\\b${number}\\b`),
      });
      await expect(row).toBeVisible();
      await expect(row).toContainText(currency);
      await expect(row).toContainText("Providus Bank");
    }
  });

  test("EduTourism Mission CTA links to the correct program page", async ({ page }) => {
    await page
      .getByRole("button", { name: "EduTourism Mission", exact: true })
      .click();

    const eduaidSection = page.locator(`#account-${eduaidGroup.id}`);
    await expect(eduaidSection).toBeVisible();

    const cta = eduaidSection.getByRole("link", {
      name: /Join an EduTourism Mission/i,
    });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/programs/edutourism-missions");
  });

  test("purpose config maps EduTourism Mission exclusively to eduaid group", () => {
    const purpose = paymentPurposes.find((p) => p.label === "EduTourism Mission");
    expect(purpose).toBeDefined();
    expect(purpose!.groups).toEqual(["eduaid"]);
  });
});
