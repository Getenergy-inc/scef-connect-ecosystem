-- Create elibrary_resources table for storing books and resources
CREATE TABLE public.elibrary_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('ebook', 'journal', 'video', 'audio')),
  cover_url TEXT,
  resource_url TEXT,
  is_published BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.elibrary_resources ENABLE ROW LEVEL SECURITY;

-- Public can view published resources
CREATE POLICY "Published resources are viewable by everyone"
ON public.elibrary_resources
FOR SELECT
USING (is_published = true);

-- Admins can manage all resources
CREATE POLICY "Admins can manage resources"
ON public.elibrary_resources
FOR ALL
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_elibrary_resources_updated_at
BEFORE UPDATE ON public.elibrary_resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample Nigerian educational resources
INSERT INTO public.elibrary_resources (title, author, description, category, resource_type, is_published) VALUES
('Things Fall Apart', 'Chinua Achebe', 'A classic Nigerian novel exploring pre-colonial Igbo society and the effects of colonialism.', 'Literature', 'ebook', true),
('Half of a Yellow Sun', 'Chimamanda Ngozi Adichie', 'A powerful story set during the Nigerian Civil War.', 'Literature', 'ebook', true),
('Nigerian History: From Colonial Times', 'Prof. Adebayo Adedeji', 'Comprehensive overview of Nigerian history from pre-colonial era to independence.', 'History', 'ebook', true),
('Introduction to Yoruba Language', 'Dr. Olusola Akinbo', 'Learn the basics of Yoruba language and culture.', 'Language', 'audio', true),
('Nigerian Agricultural Practices', 'Agricultural Research Council', 'Modern farming techniques adapted for Nigerian climate and soil.', 'Agriculture', 'journal', true),
('Mathematics for Nigerian Schools', 'NERDC', 'Aligned with Nigerian educational curriculum standards.', 'Education', 'ebook', true),
('Nigerian Law and Constitution', 'Prof. Nnamdi Asika', 'Understanding the Nigerian legal system and constitutional framework.', 'Law', 'ebook', true),
('Traditional Nigerian Medicine', 'Dr. Amina Bello', 'Documentary exploring traditional healing practices in Nigeria.', 'Health', 'video', true),
('Nigerian Economic Development', 'Central Bank Research', 'Analysis of economic policies and development strategies.', 'Economics', 'journal', true),
('Hausa Oral Traditions', 'Prof. Ibrahim Yusuf', 'Collection of Hausa proverbs, folktales, and oral literature.', 'Culture', 'audio', true),
('Nigerian Art and Sculpture', 'National Museum Archives', 'Visual tour of Nigerian artistic heritage from Nok to contemporary.', 'Arts', 'video', true),
('Science and Technology in Nigeria', 'NASRDA', 'Overview of scientific research and technological advancement in Nigeria.', 'Science', 'journal', true);