import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1';
const FROM_NAME = 'Santos Creations Educational Foundation';
const FROM_EMAIL = 'media.santoscreations@gmail.com';

const BodySchema = z.object({
  recipient_email: z.string().email().max(255),
  full_name: z.string().trim().min(1).max(200),
  reference_number: z.string().trim().min(4).max(64),
  preferred_role: z.string().trim().min(1).max(200),
  preferred_division: z.string().trim().min(1).max(80),
  application_type: z.string().trim().min(1).max(40),
});

function b64url(str: string): string {
  // utf-8 safe base64url
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(d: z.infer<typeof BodySchema>): string {
  const name = escapeHtml(d.full_name);
  const ref = escapeHtml(d.reference_number);
  const role = escapeHtml(d.preferred_role);
  const division = escapeHtml(d.preferred_division);
  const type = escapeHtml(d.application_type);
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <h1 style="font-size:20px;margin:0 0 16px;color:#0b2545;">Application Received</h1>
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">Dear ${name},</p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
      Thank you for applying to the Santos Creations Educational Foundation (SCEF).
      Your application has been securely received and assigned the reference number below.
      Please keep this reference for all future correspondence.
    </p>
    <div style="border:1px solid #e2e2e2;border-radius:10px;padding:16px;margin:16px 0;background:#faf8f2;">
      <p style="margin:0 0 6px;font-size:12px;color:#6b6b6b;text-transform:uppercase;letter-spacing:0.5px;">Your reference number</p>
      <p style="margin:0;font-size:18px;font-weight:bold;color:#0b2545;letter-spacing:1px;">${ref}</p>
    </div>
    <table style="width:100%;font-size:13px;line-height:1.6;border-collapse:collapse;margin:8px 0 20px;">
      <tr><td style="padding:4px 0;color:#6b6b6b;width:160px;">Preferred division</td><td style="padding:4px 0;">${division}</td></tr>
      <tr><td style="padding:4px 0;color:#6b6b6b;">Preferred role</td><td style="padding:4px 0;">${role}</td></tr>
      <tr><td style="padding:4px 0;color:#6b6b6b;">Application type</td><td style="padding:4px 0;">${type}</td></tr>
    </table>
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
      Our team reviews applications on a rolling basis. If you are shortlisted, we will contact you
      by email to schedule next steps. No further action is required from you at this time.
    </p>
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
      Warm regards,<br/>The SCEF Team
    </p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
    <p style="font-size:11px;color:#999;line-height:1.5;margin:0;">
      This is an automated confirmation from Santos Creations Educational Foundation.
      Please do not reply to this email unless instructed.
    </p>
  </div>
</body></html>`;
}

function buildText(d: z.infer<typeof BodySchema>): string {
  return [
    `Dear ${d.full_name},`,
    '',
    'Thank you for applying to the Santos Creations Educational Foundation (SCEF).',
    'Your application has been securely received and assigned the reference number below.',
    'Please keep this reference for all future correspondence.',
    '',
    `Reference number: ${d.reference_number}`,
    `Preferred division: ${d.preferred_division}`,
    `Preferred role: ${d.preferred_role}`,
    `Application type: ${d.application_type}`,
    '',
    'Our team reviews applications on a rolling basis. If you are shortlisted,',
    'we will contact you by email to schedule next steps.',
    '',
    'Warm regards,',
    'The SCEF Team',
  ].join('\r\n');
}

function buildMimeMessage(d: z.infer<typeof BodySchema>): string {
  const boundary = `scef_${crypto.randomUUID().replace(/-/g, '')}`;
  const subject = `SCEF Application Received — Ref ${d.reference_number}`;
  const headers = [
    `From: ${FROM_NAME} <${FROM_EMAIL}>`,
    `To: ${d.recipient_email}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join('\r\n');

  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    buildText(d),
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    buildHtml(d),
    '',
    `--${boundary}--`,
    '',
  ].join('\r\n');

  return `${headers}\r\n\r\n${body}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!GOOGLE_MAIL_API_KEY) {
      return new Response(JSON.stringify({ error: 'GOOGLE_MAIL_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const rawMime = buildMimeMessage(parsed.data);
    const raw = b64url(rawMime);

    const gmailRes = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
      },
      body: JSON.stringify({ raw }),
    });

    const bodyText = await gmailRes.text();
    if (!gmailRes.ok) {
      console.error('Gmail send failed', gmailRes.status, bodyText);
      return new Response(
        JSON.stringify({
          error: 'Gmail send failed',
          status: gmailRes.status,
          body: bodyText.slice(0, 500),
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-vacancy-confirmation error', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
