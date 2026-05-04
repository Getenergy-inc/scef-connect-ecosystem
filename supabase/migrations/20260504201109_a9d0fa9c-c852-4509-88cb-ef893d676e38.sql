
-- ============ EXTEND EXISTING TABLES ============
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS profile_photo_url text,
  ADD COLUMN IF NOT EXISTS onboarding_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS profile_completion int DEFAULT 0;

ALTER TABLE public.wallets
  ADD COLUMN IF NOT EXISTS wallet_code text UNIQUE,
  ADD COLUMN IF NOT EXISTS balance_ngn numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS balance_usd numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS balance_agc numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

ALTER TABLE public.memberships
  ADD COLUMN IF NOT EXISTS membership_type text,
  ADD COLUMN IF NOT EXISTS expiry_date date;

ALTER TABLE public.chapters
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS chapter_leader_id uuid,
  ADD COLUMN IF NOT EXISTS microsite_slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS wallet_id uuid REFERENCES public.wallets(id);

ALTER TABLE public.chapter_members
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'member',
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- ============ TRANSACTIONS ============
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES public.wallets(id),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  type text CHECK (type IN ('donation','vote','scholarship','training','csr','chapter_settlement','merchandise')),
  amount numeric NOT NULL,
  currency text DEFAULT 'NGN',
  agc_amount numeric DEFAULT 0,
  purpose text,
  status text DEFAULT 'pending',
  payment_provider text,
  provider_reference text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));
CREATE POLICY "Users insert own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage transactions" ON public.transactions FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- ============ DONATION RECEIPTS ============
CREATE TABLE IF NOT EXISTS public.donation_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  transaction_id uuid REFERENCES public.transactions(id) ON DELETE SET NULL,
  receipt_number text UNIQUE,
  donor_name text,
  amount numeric,
  currency text,
  purpose text,
  receipt_pdf_url text,
  issued_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.donation_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own receipts" ON public.donation_receipts FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));
CREATE POLICY "Admins manage receipts" ON public.donation_receipts FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- ============ CHAPTER UPGRADE REQUESTS ============
CREATE TABLE IF NOT EXISTS public.chapter_upgrade_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES public.chapters(id) ON DELETE CASCADE,
  requested_type text,
  reason text,
  documents jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending',
  requested_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.chapter_upgrade_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Chapter leaders and admins view upgrade requests" ON public.chapter_upgrade_requests FOR SELECT USING (
  is_admin(auth.uid()) OR requested_by = auth.uid() OR EXISTS (
    SELECT 1 FROM public.chapters c WHERE c.id = chapter_id AND c.chapter_leader_id = auth.uid()
  )
);
CREATE POLICY "Authenticated users create upgrade requests" ON public.chapter_upgrade_requests FOR INSERT WITH CHECK (auth.uid() = requested_by);
CREATE POLICY "Admins manage upgrade requests" ON public.chapter_upgrade_requests FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- ============ CONTRIBUTORS ============
CREATE TABLE IF NOT EXISTS public.contributors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text,
  role text CHECK (role IN ('volunteer','intern','ambassador')),
  country text,
  program_supported text,
  contribution_summary text,
  testimony text,
  photo_url text,
  badge_code text UNIQUE,
  certificate_url text,
  verification_status text DEFAULT 'pending',
  public_slug text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contributors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved contributors are public" ON public.contributors FOR SELECT USING (verification_status = 'approved' AND public_slug IS NOT NULL);
CREATE POLICY "Users view own contributor profile" ON public.contributors FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));
CREATE POLICY "Users create own contributor profile" ON public.contributors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own pending profile" ON public.contributors FOR UPDATE USING (auth.uid() = user_id AND verification_status = 'pending');
CREATE POLICY "Admins manage contributors" ON public.contributors FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

-- ============ CERTIFICATE VERIFICATIONS ============
CREATE TABLE IF NOT EXISTS public.certificate_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_code text,
  verified boolean DEFAULT false,
  searched_by uuid,
  searched_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.certificate_verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log verification searches" ON public.certificate_verifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view verifications" ON public.certificate_verifications FOR SELECT USING (is_admin(auth.uid()));

-- ============ SCHOOL NOMINATIONS ============
CREATE TABLE IF NOT EXISTS public.school_nominations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  school_name text NOT NULL,
  country text,
  region text,
  support_type text,
  needs_description text,
  is_wash_project boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.school_nominations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own nominations" ON public.school_nominations FOR SELECT USING (auth.uid() = submitted_by OR is_admin(auth.uid()));
CREATE POLICY "Authenticated users submit nominations" ON public.school_nominations FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Admins manage nominations" ON public.school_nominations FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
