
-- Create membership applications table (admin-only access)
CREATE TABLE public.membership_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sn INTEGER NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  email TEXT NOT NULL,
  mobile_numbers TEXT,
  date_of_birth TEXT,
  nationality TEXT,
  status TEXT DEFAULT 'Friends of the Organization',
  preferred_language TEXT DEFAULT 'English',
  commitment TEXT,
  date_stamp TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;

-- Admin-only access
CREATE POLICY "Admins can manage membership applications"
ON public.membership_applications
FOR ALL
USING (is_admin(auth.uid()));

-- Timestamp trigger
CREATE TRIGGER update_membership_applications_updated_at
BEFORE UPDATE ON public.membership_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
