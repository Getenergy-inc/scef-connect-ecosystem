import { describe, it } from "node:test";
import assert from "node:assert";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scanPaymentRoutes } from "./check-payment-routes.mjs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFixture(name, files) {
  const dir = mkdtempSync(join(tmpdir(), `payment-guard-${name}-`));
  for (const [path, content] of Object.entries(files)) {
    const fullPath = join(dir, path);
    mkdirSync(join(fullPath, ".."), { recursive: true });
    writeFileSync(fullPath, content);
  }
  return dir;
}

// ---------------------------------------------------------------------------
// Passing fixtures
// ---------------------------------------------------------------------------

describe("scanPaymentRoutes — clean files (no violations)", () => {
  it("passes a single clean TSX file", () => {
    const dir = makeFixture("clean-single", {
      "src/pages/Donate.tsx": `
export default function Donate() {
  return <div>Donate via Providus Bank</div>;
}
`,
    });

    const { files, violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(files.length, 1);
    assert.strictEqual(violations.length, 0);
  });

  it("passes multiple clean files in a directory target", () => {
    const dir = makeFixture("clean-dir", {
      "src/pages/payments/OfficialAccounts.tsx": `
export default function OfficialAccounts() {
  return <div>Official bank accounts listed here</div>;
}
`,
      "src/pages/payments/GFAWallet.tsx": `
export default function GFAWallet() {
  return <div>Pay with GFA Wallet</div>;
}
`,
    });

    const { files, violations } = scanPaymentRoutes(dir, ["src/pages/payments"]);
    assert.strictEqual(files.length, 2);
    assert.strictEqual(violations.length, 0);
  });

  it("passes with missing target directories (no crash)", () => {
    const dir = makeFixture("missing-dir", {});
    const { files, violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(files.length, 0);
    assert.strictEqual(violations.length, 0);
  });
});

// ---------------------------------------------------------------------------
// Failing fixtures — one per rule
// ---------------------------------------------------------------------------

describe("scanPaymentRoutes — forbidden patterns (violations)", () => {
  it("detects HTML <form> element", () => {
    const dir = makeFixture("form", {
      "src/pages/Donate.tsx": `<form onSubmit={handleSubmit}><input /></form>`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "html-form");
  });

  it("detects file input", () => {
    const dir = makeFixture("file-input", {
      "src/pages/Donate.tsx": `<input type="file" onChange={onUpload} />`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "file-input");
  });

  it("detects upload handler / FormData", () => {
    const dir = makeFixture("upload", {
      "src/pages/Donate.tsx": `const fd = new FormData(); handleUpload(fd);`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "upload-handler");
  });

  it("detects Supabase write call (insert)", () => {
    const dir = makeFixture("supabase-insert", {
      "src/pages/Donate.tsx": `await supabase.from("donations").insert({ amount });`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "supabase-write");
  });

  it("detects Supabase update call", () => {
    const dir = makeFixture("supabase-update", {
      "src/pages/Donate.tsx": `await supabase.from("donations").update({ status: "paid" });`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "supabase-write");
  });

  it("detects Supabase storage upload", () => {
    const dir = makeFixture("storage-upload", {
      "src/pages/Donate.tsx": `await supabase.storage.from("receipts").upload(file);`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "supabase-storage-upload");
  });

  it("detects edge function invoke", () => {
    const dir = makeFixture("edge-invoke", {
      "src/pages/Donate.tsx": `await supabase.functions.invoke("process-payment", { body });`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "edge-function-invoke");
  });

  it("detects auth sign-up call", () => {
    const dir = makeFixture("auth-signup", {
      "src/pages/Donate.tsx": `await supabase.auth.signUp({ email, password });`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "auth-call");
  });

  it("detects imported payment form component", () => {
    const dir = makeFixture("import-form", {
      "src/pages/Donate.tsx": `import PaymentConfirmationForm from "@/components/payments/PaymentConfirmationForm";`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 1);
    assert.strictEqual(violations[0].rule, "payment-form-component");
  });

  it("detects multiple violations in one file", () => {
    const dir = makeFixture("multi-violation", {
      "src/pages/Donate.tsx": `
import PaymentConfirmationForm from "@/components/payments/PaymentConfirmationForm";
export default function Donate() {
  return <form><input type="file" /></form>;
}
`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 3);
    const rulesHit = violations.map((v) => v.rule).sort();
    assert.deepStrictEqual(rulesHit, [
      "file-input",
      "html-form",
      "payment-form-component",
    ]);
  });

  it("ignores violations inside comments", () => {
    const dir = makeFixture("commented-out", {
      "src/pages/Donate.tsx": `
// <form onSubmit={handleSubmit}>
/* await supabase.from("donations").insert({ amount }); */
export default function Donate() {
  return <div>Clean</div>;
}
`,
    });
    const { violations } = scanPaymentRoutes(dir, ["src/pages/Donate.tsx"]);
    assert.strictEqual(violations.length, 0);
  });
});

// ---------------------------------------------------------------------------
// Integration test — real project paths
// ---------------------------------------------------------------------------

describe("scanPaymentRoutes — integration (real project)", () => {
  it("passes on the actual payment route files", () => {
    const ROOT = new URL("..", import.meta.url).pathname;
    const TARGETS = [
      "src/pages/Donate.tsx",
      "src/pages/DonationSuccess.tsx",
      "src/pages/SupportUs.tsx",
      "src/pages/payments",
      "src/components/payments",
      "src/components/sections/DonationChannels.tsx",
      "src/components/eduaid/EduAidDonationSection.tsx",
    ];
    const { files, violations } = scanPaymentRoutes(ROOT, TARGETS);
    assert.ok(files.length >= 3, `expected >= 3 files, got ${files.length}`);
    assert.strictEqual(
      violations.length,
      0,
      violations.map((v) => `[${v.rule}] ${v.file}:${v.line}`).join("\n")
    );
  });
});
