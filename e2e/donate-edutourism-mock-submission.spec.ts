import { test, expect } from "@playwright/test";
import { accountGroupById } from "../src/config/officialAccounts";

/**
 * Mock end-to-end donation flow for "EduTourism Mission":
 *  1. Select the EduTourism Mission purpose on /donate
 *  2. Capture the recommended EduAid-Africa bank CTA + Providus account details
 *  3. Click the bank CTA to jump to the EduAid-Africa account section
 *  4. Simulate a completed donation by navigating to the donation confirmation
 *     page (/donation-success) with a mock payment reference + amount, as a
 *     real payment provider redirect would do
 *  5. Assert the receipt / confirmation page renders the mock reference,
 *     amount and a thank-you message
 *  6. Return to /donate and confirm the same EduTourism → EduAid-Africa bank
 *     CTA details are still surfaced (no regressions in routing config)
 */

const eduaidGroup = accountGroupById("eduaid");

const MOCK_REFERENCE = "MOCK-EDUTOURISM-REF-12345";
const MOCK_AMOUNT = "150";

test.describe("/donate — mock EduTourism Mission donation flow", () => {
  test("submitting a mock EduTourism donation shows the confirmation page with bank CTA details", async ({
    page,
  }) => {
    // 1. Open the donate page
    await page.goto("/donate");

    // 2. Select EduTourism Mission
    await page
      .getByRole("button", { name: "EduTourism Mission", exact: true })
      .click();

    // 3. The recommendation card should surface the EduAid-Africa bank CTA
    const recommendation = page.locator("text=please pay into the").locator("..");
    await expect(recommendation).toBeVisible();
    await expect(recommendation).toContainText(eduaidGroup.shortName);

    const bankCta = recommendation.getByRole("link", {
      name: new RegExp(`${eduaidGroup.shortName} Bank`, "i"),
    });
    await expect(bankCta).toHaveCount(1);
    await expect(bankCta).toHaveAttribute("href", `#account-${eduaidGroup.id}`);

    // 4. Clicking the bank CTA scrolls to the EduAid-Africa Providus accounts
    await bankCta.click();
    const eduaidSection = page.locator(`#account-${eduaidGroup.id}`);
    await expect(eduaidSection).toBeVisible();

    // Capture the primary NGN Providus account number from the displayed CTA
    const ngnAccount = eduaidGroup.accounts.find((a) => a.currency === "NGN")!;
    await expect(eduaidSection).toContainText(ngnAccount.accountNumber);
    await expect(eduaidSection).toContainText("Providus Bank");

    // 5. Simulate a completed donation by navigating to the confirmation page
    //    with a mock payment provider reference + amount, mirroring the
    //    redirect flow used by Paystack / Flutterwave webhooks.
    await page.goto(
      `/donation-success?reference=${encodeURIComponent(MOCK_REFERENCE)}&amount=${encodeURIComponent(MOCK_AMOUNT)}`,
    );

    // Receipt / confirmation page assertions
    await expect(
      page.getByRole("heading", { name: /Thank You for Your/i }),
    ).toBeVisible();
    await expect(page.getByText(/Transaction Details/i)).toBeVisible();
    await expect(page.getByText(MOCK_REFERENCE)).toBeVisible();
    await expect(page.getByText(`$${MOCK_AMOUNT}`)).toBeVisible();
    await expect(
      page.getByText(/donation receipt has been sent to your email/i),
    ).toBeVisible();

    // Donor can return to donate again from the confirmation page
    const donateAgain = page.getByRole("link", { name: /Donate Again/i });
    await expect(donateAgain).toBeVisible();
    await expect(donateAgain).toHaveAttribute("href", "/donate");

    // 6. Returning to /donate must still route EduTourism → EduAid-Africa with
    //    the exact same Providus bank CTA details (config integrity check).
    await donateAgain.click();
    await expect(page).toHaveURL(/\/donate$/);

    await page
      .getByRole("button", { name: "EduTourism Mission", exact: true })
      .click();

    const recommendationAfter = page
      .locator("text=please pay into the")
      .locator("..");
    await expect(recommendationAfter).toContainText(eduaidGroup.shortName);
    await expect(
      recommendationAfter.getByRole("link", {
        name: new RegExp(`${eduaidGroup.shortName} Bank`, "i"),
      }),
    ).toHaveAttribute("href", `#account-${eduaidGroup.id}`);

    const eduaidSectionAfter = page.locator(`#account-${eduaidGroup.id}`);
    await expect(eduaidSectionAfter).toContainText(ngnAccount.accountNumber);
  });
});
