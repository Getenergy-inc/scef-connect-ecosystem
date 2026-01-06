-- Add CHECK constraints to donations table for input validation
-- These constraints enforce data integrity at the database level

-- Amount must be positive and reasonable
ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_amount_positive 
    CHECK (amount > 0);

ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_amount_reasonable 
    CHECK (amount <= 10000000);

-- Currency must be a valid supported currency
ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_currency_valid 
    CHECK (currency IS NULL OR currency IN ('USD', 'NGN', 'GHS', 'KES', 'ZAR', 'EUR', 'GBP', 'XOF', 'XAF', 'EGP', 'MAD', 'TZS', 'UGX', 'RWF', 'ETB'));

-- Payment status must be a valid status
ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_payment_status_valid 
    CHECK (payment_status IS NULL OR payment_status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled'));

-- Donor name length limit
ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_donor_name_length 
    CHECK (donor_name IS NULL OR char_length(donor_name) <= 200);

-- Donor email format validation (basic pattern)
ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_email_format 
    CHECK (donor_email IS NULL OR donor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Message length limit
ALTER TABLE public.donations 
  ADD CONSTRAINT check_donation_message_length 
    CHECK (message IS NULL OR char_length(message) <= 2000);

-- Add similar constraints to partnership_inquiries table
ALTER TABLE public.partnership_inquiries
  ADD CONSTRAINT check_inquiry_company_name_length
    CHECK (char_length(company_name) <= 200);

ALTER TABLE public.partnership_inquiries
  ADD CONSTRAINT check_inquiry_contact_name_length
    CHECK (char_length(contact_name) <= 200);

ALTER TABLE public.partnership_inquiries
  ADD CONSTRAINT check_inquiry_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.partnership_inquiries
  ADD CONSTRAINT check_inquiry_message_length
    CHECK (message IS NULL OR char_length(message) <= 5000);

ALTER TABLE public.partnership_inquiries
  ADD CONSTRAINT check_inquiry_phone_length
    CHECK (phone IS NULL OR char_length(phone) <= 30);