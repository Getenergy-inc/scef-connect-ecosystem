-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('member', 'ambassador', 'volunteer', 'donor', 'partner', 'chapter_admin', 'admin', 'super_admin');

-- Create chapter type enum
CREATE TYPE public.chapter_type AS ENUM ('online', 'hybrid', 'physical');

-- Create chapter status enum
CREATE TYPE public.chapter_status AS ENUM ('pending', 'active', 'suspended');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  country TEXT,
  state TEXT,
  city TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create user roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create chapters table
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  country TEXT NOT NULL,
  state TEXT,
  city TEXT,
  chapter_type chapter_type DEFAULT 'online' NOT NULL,
  status chapter_status DEFAULT 'pending' NOT NULL,
  image_url TEXT,
  member_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create chapter members table
CREATE TABLE public.chapter_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  joined_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(chapter_id, user_id)
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  program_id UUID REFERENCES public.programs(id),
  chapter_id UUID REFERENCES public.chapters(id),
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  donor_name TEXT,
  donor_email TEXT,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  receipt_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create wallet table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance DECIMAL(12,2) DEFAULT 0.00,
  agc_balance DECIMAL(12,4) DEFAULT 0.0000,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create wallet transactions table
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT NOT NULL,
  description TEXT,
  reference_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create digital board items table
CREATE TABLE public.digital_board_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'audio', 'image', 'text')),
  content_url TEXT,
  content_text TEXT,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  publish_at TIMESTAMPTZ,
  expire_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_type TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  is_virtual BOOLEAN DEFAULT false,
  registration_url TEXT,
  image_url TEXT,
  program_id UUID REFERENCES public.programs(id),
  chapter_id UUID REFERENCES public.chapters(id),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create media items table
CREATE TABLE public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'audio', 'image', 'document')),
  platform TEXT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create partnership inquiries table
CREATE TABLE public.partnership_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  partnership_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_board_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_inquiries ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'super_admin')
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for programs (public read)
CREATE POLICY "Programs are viewable by everyone" ON public.programs
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage programs" ON public.programs
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for chapters (public read for active)
CREATE POLICY "Active chapters are viewable by everyone" ON public.chapters
  FOR SELECT USING (status = 'active' OR auth.uid() = created_by OR public.is_admin(auth.uid()));

CREATE POLICY "Authenticated users can create chapters" ON public.chapters
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Chapter creators and admins can update" ON public.chapters
  FOR UPDATE USING (auth.uid() = created_by OR public.is_admin(auth.uid()));

-- RLS Policies for chapter_members
CREATE POLICY "Members can view chapter members" ON public.chapter_members
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can join chapters" ON public.chapter_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave chapters" ON public.chapter_members
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for donations
CREATE POLICY "Users can view their own donations" ON public.donations
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Anyone can create donations" ON public.donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage donations" ON public.donations
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for wallets
CREATE POLICY "Users can view their own wallet" ON public.wallets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet" ON public.wallets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can create wallets" ON public.wallets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for wallet_transactions
CREATE POLICY "Users can view their own transactions" ON public.wallet_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.wallets 
      WHERE wallets.id = wallet_transactions.wallet_id 
      AND wallets.user_id = auth.uid()
    )
  );

-- RLS Policies for digital_board_items (public read for active)
CREATE POLICY "Active board items are viewable by everyone" ON public.digital_board_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage board items" ON public.digital_board_items
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for events (public read for published)
CREATE POLICY "Published events are viewable by everyone" ON public.events
  FOR SELECT USING (is_published = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage events" ON public.events
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for media_items (public read for published)
CREATE POLICY "Published media is viewable by everyone" ON public.media_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage media" ON public.media_items
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for partnership_inquiries
CREATE POLICY "Anyone can submit partnership inquiry" ON public.partnership_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view inquiries" ON public.partnership_inquiries
  FOR SELECT USING (public.is_admin(auth.uid()));

-- Create trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  
  -- Auto-assign member role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member');
  
  -- Create wallet for user
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at
  BEFORE UPDATE ON public.chapters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_digital_board_updated_at
  BEFORE UPDATE ON public.digital_board_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial programs
INSERT INTO public.programs (slug, name, short_description) VALUES
  ('nesa-africa', 'NESA-Africa', 'Nigerian Education Stakeholders Awards recognizing excellence in education'),
  ('eduaid-africa', 'EduAid-Africa', 'Educational aid and support for underserved communities'),
  ('rebuild-my-school-africa', 'Rebuild My School Africa', 'Infrastructure development for schools across Africa'),
  ('women-girls-education', 'Women & Girls Education', 'Empowering women and girls through education'),
  ('special-needs-education', 'Special Needs Education', 'Inclusive education for learners with special needs'),
  ('education-online-africa', 'Education Online Africa', 'Digital learning platforms and e-learning initiatives'),
  ('elibrary-nigeria', 'eLibrary Nigeria', 'Digital library resources for Nigerian students');

-- Seed sample digital board items
INSERT INTO public.digital_board_items (title, content_type, content_text, cta_text, cta_link, display_order) VALUES
  ('NESA 2025 Nominations Open', 'text', 'Nominate outstanding educators and institutions for the Nigerian Education Stakeholders Awards 2025.', 'Submit Nomination', '/programs/nesa-africa', 1),
  ('Join Your Local Chapter', 'text', 'Connect with education advocates in your community. Find or create a local SCEF chapter today.', 'Browse Chapters', '/local-chapters', 2),
  ('Support Rebuild My School', 'text', 'Help us rebuild schools affected by conflict and natural disasters across Africa.', 'Donate Now', '/donate', 3);