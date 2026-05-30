#!/usr/bin/env node
/**
 * Payment Routes Static Guard
 * -----------------------------------------------------------------------------
 * Blocks any <form>, file/upload inputs, or DB write calls on payment-facing
 * routes (Donate, Support Us, Official Accounts, donation channel components).
 *
 * Per project rule: until backend is wired, every payment surface MUST stay
 * static — Providus accounts + GFA Wallet info + Sophia WhatsApp CTAs only.
 *
 * Exit code: 0 clean, 1 on any violation (so CI fails the PR).
 */

import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

// Files & directories that must remain fully static.
const TARGETS = [
  "src/pages/Donate.tsx",
  "src/pages/DonationSuccess.tsx",
  "src/pages/SupportUs.tsx",
  "src/pages/payments",
  "src/components/payments",
  "src/components/sections/DonationChannels.tsx",
  "src/components/eduaid/EduAidDonationSection.tsx",
];

// Forbidden patterns. Each entry: { id, label, regex }.
const RULES = [
  {
    id: "html-form",
    label: "HTML <form> element",
    regex: /<form\b/i,
  },
  {
    id: "file-input",
    label: 'File input (<input type="file">)',
    regex: /<input[^>]*type\s*=\s*['"]file['"]/i,
  },
  {
    id: "upload-handler",
    label: "Upload handler / FormData / multipart",
    regex: /\b(FormData|multipart\/form-data|\.upload\s*\(|onUpload\b|handleUpload\b)/,
  },
  {
    id: "supabase-write",
    label: "Supabase write call (insert/update/upsert/delete)",
    // Match: supabase.from("x").insert( … etc, including method chains.
    regex: /supabase[\s\S]{0,200}?\.(insert|update|upsert|delete)\s*\(/,
  },
  {
    id: "supabase-storage-upload",
    label: "Supabase Storage upload",
    regex: /supabase\.storage[\s\S]{0,200}?\.upload\s*\(/,
  },
  {
    id: "edge-function-invoke",
    label: "Edge function invoke (functions.invoke)",
    regex: /supabase\.functions\.invoke\s*\(/,
  },
  {
    id: "auth-call",
    label: "Auth call (sign-in / sign-up / reset)",
    regex: /supabase\.auth\.(signIn|signUp|signInWith|resetPasswordForEmail|updateUser)/i,
  },
  {
    id: "payment-form-component",
    label: "Imported payment/upload/registration form component",
    regex: /import[\s\S]{0,200}from\s+['"][^'"]*(PaymentConfirmationForm|UploadProof|RegistrationForm|DonorForm|FundraisingForm)['"]/,
  },
];

// ─────────────────────────────────────────────────────────────────────────────

function walk(p, out = []) {
  if (!existsSync(p)) return out;
  const s = statSync(p);
  if (s.isFile()) {
    if (/\.(tsx?|jsx?)$/.test(p)) out.push(p);
    return out;
  }
  for (const entry of readdirSync(p)) {
    if (entry.startsWith(".")) continue;
    walk(join(p, entry), out);
  }
  return out;
}

const files = TARGETS.flatMap((t) => walk(join(ROOT, t)));
const violations = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  // Strip line/block comments to avoid false positives in documentation.
  const stripped = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

  const lines = stripped.split("\n");
  for (const rule of RULES) {
    lines.forEach((line, i) => {
      if (rule.regex.test(line)) {
        violations.push({
          file: relative(ROOT, file),
          line: i + 1,
          rule: rule.id,
          label: rule.label,
          snippet: line.trim().slice(0, 160),
        });
      }
    });
  }
}

if (violations.length === 0) {
  console.log(
    `✅ payment-routes guard: ${files.length} file(s) scanned — no forbidden ` +
      `forms, uploads, or DB writes detected.`
  );
  process.exit(0);
}

console.error(
  `❌ payment-routes guard: ${violations.length} violation(s) found.\n` +
    `Payment surfaces must stay static (Providus + GFA Wallet + Sophia WhatsApp only).\n`
);
for (const v of violations) {
  console.error(`  • [${v.rule}] ${v.file}:${v.line}`);
  console.error(`      ${v.label}`);
  console.error(`      → ${v.snippet}`);
}
process.exit(1);
