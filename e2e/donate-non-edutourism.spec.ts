import { test, expect } from "@playwright/test";
import {
  paymentPurposes,
  accountGroupById,
} from "../src/config/officialAccounts";

/**
 * Verifies that selecting any non–EduTourism Mission payment purpose on
 * /donate never surfaces the EduAid-Africa Providus bank accounts as a
 * recommended routing target.
 *
 * The "Official Providus Bank Accounts" section statically lists all
 * groups (SCEF, EduAid-Africa, NESA-Africa). The "routing" behavior we
 * are testing is the recommendation card rendered after a purpose is
 * picked — it must not include the EduAid-Africa Bank CTA for any
 * purpose whose groups exclude "eduaid".
 */

const eduaidGroup = accountGroupById("eduaid");

const nonEduTourismPurposes = paymentPurposes.filter(
  (p) => p.label !== "EduTourism Mission" && !p.groups.includes("eduaid"),
);

test.describe("/donate routing — non–EduTourism Mission purposes", () => {
  for (const purpose of nonEduTourismPurposes) {
    test(`"${purpose.label}" does not route to EduAid-Africa`, async ({ page }) => {
      await page.goto("/donate");

      // Pick the purpose chip.
      await page.getByRole("button", { name: purpose.label, exact: true }).click();

      // Scope all assertions to the recommendation card that appears
      // immediately under the purpose chips.
      const recommendation = page.locator("text=please pay into the").locator("..");
      await expect(recommendation).toBeVisible();

      // It must reference the actual recommended group(s)…
      for (const groupId of purpose.groups) {
        const group = accountGroupById(groupId);
        await expect(recommendation).toContainText(group.shortName);
      }

      // …and must NOT route to the EduAid-Africa bank.
      await expect(
        recommendation.getByRole("link", {
          name: new RegExp(`${eduaidGroup.shortName} Bank`, "i"),
        }),
      ).toHaveCount(0);
      await expect(recommendation).not.toContainText(eduaidGroup.shortName);
    });
  }

  test("EduTourism Mission still routes to EduAid-Africa (sanity check)", async ({ page }) => {
    await page.goto("/donate");
    await page.getByRole("button", { name: "EduTourism Mission", exact: true }).click();

    const recommendation = page.locator("text=please pay into the").locator("..");
    await expect(recommendation).toContainText(eduaidGroup.shortName);
    await expect(
      recommendation.getByRole("link", {
        name: new RegExp(`${eduaidGroup.shortName} Bank`, "i"),
      }),
    ).toHaveCount(1);
  });
});
