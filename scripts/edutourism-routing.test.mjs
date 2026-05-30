// Verifies that selecting "EduTourism Mission" on /donate routes the user to
// the correct EduAid-Africa Providus bank accounts section.
//
// Run: node --test scripts/edutourism-routing.test.mjs

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, "../src/config/officialAccounts.ts");
const source = readFileSync(configPath, "utf8");

// Transpile the TS config to ESM JS in-memory and import via data: URL.
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
});
const mod = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const { paymentPurposes, accountGroupById, officialAccounts } = mod;

test("EduTourism Mission is an available payment purpose on /donate", () => {
  const purpose = paymentPurposes.find((p) => p.label === "EduTourism Mission");
  assert.ok(purpose, '"EduTourism Mission" must be listed in paymentPurposes');
  assert.deepEqual(
    purpose.groups,
    ["eduaid"],
    "EduTourism Mission must route to the EduAid-Africa account group only",
  );
});

test("EduTourism Mission routes to the EduAid-Africa group", () => {
  const purpose = paymentPurposes.find((p) => p.label === "EduTourism Mission");
  const group = accountGroupById(purpose.groups[0]);
  assert.equal(group.id, "eduaid");
  assert.equal(group.shortName, "EduAid-Africa");
  assert.equal(group.name, "EduAid Africa Ltd");
});

test("EduAid-Africa group uses Providus Bank", () => {
  const group = accountGroupById("eduaid");
  assert.equal(group.bank, "Providus Bank");
});

test("EduAid-Africa Providus accounts expose the correct numbers per currency", () => {
  const group = accountGroupById("eduaid");
  const byCurrency = Object.fromEntries(
    group.accounts.map((a) => [a.currency, a.accountNumber]),
  );
  assert.deepEqual(byCurrency, {
    NGN: "1305744507",
    USD: "1307264500",
    EUR: "1307264531",
    GBP: "1307264548",
  });
});

test("EduAid-Africa CTA links to the EduTourism Missions program page", () => {
  const group = accountGroupById("eduaid");
  const cta = group.ctas.find((c) => /EduTourism/i.test(c.label));
  assert.ok(cta, "EduAid-Africa must expose an EduTourism Mission CTA");
  assert.equal(cta.to, "/programs/edutourism-missions");
});

test("EduTourism is recommended use under EduAid-Africa", () => {
  const group = accountGroupById("eduaid");
  assert.ok(
    group.recommendedUse.some((u) => /EduTourism/i.test(u)),
    "EduTourism must appear in EduAid-Africa recommendedUse",
  );
});

test("No other account group claims the EduTourism Mission purpose", () => {
  const purpose = paymentPurposes.find((p) => p.label === "EduTourism Mission");
  const others = officialAccounts.filter(
    (g) => g.id !== "eduaid" && purpose.groups.includes(g.id),
  );
  assert.equal(others.length, 0);
});
