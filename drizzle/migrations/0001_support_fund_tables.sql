CREATE TABLE public.support_fund_pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site text NOT NULL DEFAULT 'scef' CHECK (site IN ('scef','eduaid','nesa')),
  reference text NOT NULL UNIQUE CHECK (reference ~ '^EA-(DN|SP|PT)-[0-9]{6}-[A-Z0-9]{4}$'),
  pledge_type text NOT NULL CHECK (pledge_type IN ('donate','sponsor','partner')),
  frequency text CHECK (frequency IN ('one-time','monthly','annual')),
  currency text CHECK (currency IN ('USD','NGN','GBP','EUR')),
  amount numeric CHECK (amount IS NULL OR (amount > 0 AND amount < 100000000)),
  region text CHECK (region IS NULL OR region IN ('any','north','west','central','east','southern','sahel','horn','indian')),
  category text CHECK (category IS NULL OR char_length(category) <= 120),
  sponsor_scope text CHECK (sponsor_scope IS NULL OR char_length(sponsor_scope) <= 60),
  projects text[] NOT NULL DEFAULT '{}',
  contributions text[] NOT NULL DEFAULT '{}',
  regions_of_interest text[] NOT NULL DEFAULT '{}',
  in_kind_description text CHECK (char_length(in_kind_description) <= 2000),
  recognition_name text CHECK (char_length(recognition_name) <= 200),
  no_recognition boolean NOT NULL DEFAULT false,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  organisation text CHECK (char_length(organisation) <= 200),
  organisation_type text CHECK (char_length(organisation_type) <= 100),
  role text CHECK (char_length(role) <= 120),
  donating_as text CHECK (char_length(donating_as) <= 60),
  email text NOT NULL CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text CHECK (char_length(phone) <= 40),
  country text CHECK (char_length(country) <= 100),
  website text CHECK (char_length(website) <= 300),
  preferred_contact text CHECK (char_length(preferred_contact) <= 40),
  message text CHECK (char_length(message) <= 3000),
  anonymous_public boolean NOT NULL DEFAULT false,
  acknowledged boolean NOT NULL CHECK (acknowledged = true),
  status text NOT NULL DEFAULT 'pledged' CHECK (status IN ('pledged','transfer_reported','reconciled','receipted','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.support_fund_pledges TO anon, authenticated;
GRANT SELECT, UPDATE ON public.support_fund_pledges TO authenticated;
GRANT ALL ON public.support_fund_pledges TO service_role;
ALTER TABLE public.support_fund_pledges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a pledge" ON public.support_fund_pledges FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pledged' AND acknowledged = true);
CREATE POLICY "Admins read pledges" ON public.support_fund_pledges FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins update pledges" ON public.support_fund_pledges FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.support_fund_transfer_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site text NOT NULL DEFAULT 'scef' CHECK (site IN ('scef','eduaid','nesa')),
  reference text NOT NULL CHECK (reference ~ '^EA-(DN|SP|PT)-[0-9]{6}-[A-Z0-9]{4}$'),
  date_paid date NOT NULL,
  amount_sent numeric NOT NULL CHECK (amount_sent > 0 AND amount_sent < 100000000),
  currency text CHECK (currency IN ('USD','NGN','GBP','EUR')),
  sender_account_name text NOT NULL CHECK (char_length(sender_account_name) BETWEEN 1 AND 200),
  bank_transaction_id text CHECK (char_length(bank_transaction_id) <= 100),
  status text NOT NULL DEFAULT 'awaiting_reconciliation' CHECK (status IN ('awaiting_reconciliation','reconciled','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.support_fund_transfer_reports TO anon, authenticated;
GRANT SELECT, UPDATE ON public.support_fund_transfer_reports TO authenticated;
GRANT ALL ON public.support_fund_transfer_reports TO service_role;
ALTER TABLE public.support_fund_transfer_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can report a transfer" ON public.support_fund_transfer_reports FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'awaiting_reconciliation');
CREATE POLICY "Admins read transfer reports" ON public.support_fund_transfer_reports FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins update transfer reports" ON public.support_fund_transfer_reports FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));