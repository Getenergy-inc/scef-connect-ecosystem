-- Create vacancies table for job listings CMS
CREATE TABLE public.vacancies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT,
  employment_type TEXT NOT NULL DEFAULT 'full-time',
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  salary_range TEXT,
  application_email TEXT,
  application_deadline DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;

-- Public can view active vacancies
CREATE POLICY "Anyone can view active vacancies" 
ON public.vacancies 
FOR SELECT 
USING (is_active = true);

-- Admins can manage vacancies
CREATE POLICY "Admins can manage vacancies" 
ON public.vacancies 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Create updated_at trigger
CREATE TRIGGER update_vacancies_updated_at
BEFORE UPDATE ON public.vacancies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create governance_profiles table for BOT, BOA, BOD, LCPs, Management Team
CREATE TABLE public.governance_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  board_type TEXT NOT NULL CHECK (board_type IN ('bot', 'boa', 'bod', 'lcp', 'management')),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  linkedin_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.governance_profiles ENABLE ROW LEVEL SECURITY;

-- Public can view active profiles
CREATE POLICY "Anyone can view active governance profiles" 
ON public.governance_profiles 
FOR SELECT 
USING (is_active = true);

-- Admins can manage profiles
CREATE POLICY "Admins can manage governance profiles" 
ON public.governance_profiles 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Create updated_at trigger for governance_profiles
CREATE TRIGGER update_governance_profiles_updated_at
BEFORE UPDATE ON public.governance_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();