-- Fix 1: Restrict profiles table - currently exposes PII to everyone
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Users can only view their own profile, admins can view all
CREATE POLICY "Users can view own profile or admins can view all"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- Fix 2: Add validation to donations INSERT policy
DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;

-- Allow donations but require valid amount and email
CREATE POLICY "Anyone can create donations with valid data"
ON public.donations
FOR INSERT
WITH CHECK (
  amount > 0 
  AND (donor_email IS NULL OR donor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
  AND length(coalesce(donor_name, '')) <= 200
  AND length(coalesce(message, '')) <= 2000
);

-- Fix 3: Add validation to partnership inquiries INSERT policy
DROP POLICY IF EXISTS "Anyone can submit partnership inquiry" ON public.partnership_inquiries;

-- Allow inquiries but require valid data
CREATE POLICY "Anyone can submit partnership inquiry with valid data"
ON public.partnership_inquiries
FOR INSERT
WITH CHECK (
  length(company_name) > 0 AND length(company_name) <= 200
  AND length(contact_name) > 0 AND length(contact_name) <= 200
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(coalesce(message, '')) <= 5000
);

-- Fix 4: Add admin management policies for partnership_inquiries (missing UPDATE/DELETE)
CREATE POLICY "Admins can manage partnership inquiries"
ON public.partnership_inquiries
FOR ALL
USING (is_admin(auth.uid()));