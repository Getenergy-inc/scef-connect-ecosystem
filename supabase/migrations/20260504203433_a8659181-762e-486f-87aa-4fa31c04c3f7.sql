
-- wallet_transactions extension
ALTER TABLE public.wallet_transactions
  ADD COLUMN IF NOT EXISTS user_id UUID,
  ADD COLUMN IF NOT EXISTS direction TEXT,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS source TEXT,
  ADD COLUMN IF NOT EXISTS reference TEXT,
  ADD COLUMN IF NOT EXISTS donation_id UUID,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'completed',
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_wallet_tx_wallet ON public.wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_user ON public.wallet_transactions(user_id);

ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Users view own wallet transactions"
  ON public.wallet_transactions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "Admins manage wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Admins manage wallet transactions"
  ON public.wallet_transactions FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- school_nominations extension
ALTER TABLE public.school_nominations
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS student_count INTEGER,
  ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS reviewed_by UUID,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DROP TRIGGER IF EXISTS trg_school_nominations_updated ON public.school_nominations;
CREATE TRIGGER trg_school_nominations_updated
  BEFORE UPDATE ON public.school_nominations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- OTP codes
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'login',
  expires_at TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_otp_email ON public.otp_codes(email);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON public.otp_codes(expires_at);
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins view OTP codes" ON public.otp_codes;
CREATE POLICY "Admins view OTP codes"
  ON public.otp_codes FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Generators
CREATE SEQUENCE IF NOT EXISTS public.receipt_seq;
CREATE SEQUENCE IF NOT EXISTS public.badge_seq;

CREATE OR REPLACE FUNCTION public.generate_receipt_number()
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE yr TEXT := to_char(now(), 'YYYY'); n BIGINT;
BEGIN
  n := nextval('public.receipt_seq');
  RETURN 'SCEF-RCPT-' || yr || '-' || lpad(n::text, 6, '0');
END; $$;

CREATE OR REPLACE FUNCTION public.generate_badge_code(_role TEXT)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE yr TEXT := to_char(now(), 'YYYY'); n BIGINT; role_code TEXT;
BEGIN
  role_code := CASE upper(_role)
    WHEN 'VOLUNTEER'  THEN 'VOL'
    WHEN 'INTERN'     THEN 'INT'
    WHEN 'AMBASSADOR' THEN 'AMB'
    WHEN 'PARTNER'    THEN 'PRT'
    WHEN 'STAFF'      THEN 'STF'
    ELSE upper(left(_role, 3))
  END;
  n := nextval('public.badge_seq');
  RETURN 'SCEF-' || role_code || '-' || yr || '-' || lpad(n::text, 4, '0');
END; $$;

-- Receipt uniqueness
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'donation_receipts_receipt_number_key') THEN
    ALTER TABLE public.donation_receipts ADD CONSTRAINT donation_receipts_receipt_number_key UNIQUE (receipt_number);
  END IF;
END $$;
