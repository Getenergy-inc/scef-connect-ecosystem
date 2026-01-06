-- Add server-side validation constraints to donations table
-- This ensures donation amounts are validated at the database level regardless of client-side checks

-- Add CHECK constraint for positive amount with reasonable maximum
ALTER TABLE public.donations
ADD CONSTRAINT donations_amount_positive CHECK (amount > 0 AND amount <= 1000000);

-- Add CHECK constraint for valid currency
ALTER TABLE public.donations
ADD CONSTRAINT donations_valid_currency CHECK (currency IS NULL OR currency IN ('USD', 'NGN', 'GBP', 'EUR', 'ZAR', 'KES', 'GHS'));

-- Add CHECK constraint for valid payment status
ALTER TABLE public.donations
ADD CONSTRAINT donations_valid_payment_status CHECK (payment_status IS NULL OR payment_status IN ('pending', 'completed', 'failed', 'refunded'));

-- Add CHECK constraint for message length to prevent abuse
ALTER TABLE public.donations
ADD CONSTRAINT donations_message_length CHECK (message IS NULL OR length(message) <= 1000);

-- Add CHECK constraint for donor name length
ALTER TABLE public.donations
ADD CONSTRAINT donations_donor_name_length CHECK (donor_name IS NULL OR length(donor_name) <= 200);

-- Add CHECK constraint for donor email format (basic check)
ALTER TABLE public.donations
ADD CONSTRAINT donations_email_format CHECK (donor_email IS NULL OR donor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');