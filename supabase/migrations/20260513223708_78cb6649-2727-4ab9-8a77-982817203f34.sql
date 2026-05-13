
CREATE TABLE public.master_timelines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  eyebrow TEXT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  image_alt TEXT,
  badge_label TEXT,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  ctas JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.master_timelines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active timelines are publicly readable"
ON public.master_timelines FOR SELECT
USING (is_active = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins manage master timelines"
ON public.master_timelines FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('admin','super_admin','hq_admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('admin','super_admin','hq_admin')
  )
);

CREATE TRIGGER update_master_timelines_updated_at
BEFORE UPDATE ON public.master_timelines
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.master_timelines (slug, eyebrow, title, description, image_url, image_alt, badge_label, highlights, ctas, display_order)
VALUES
(
  'nesa-africa',
  'NESA-Africa 2026–2027',
  'Master Timeline 2026–2027',
  'Follow the full NESA-Africa journey from public pre-nomination campaigns and online TV shows to the Blue Garnet Awards Gala and post-gala school impact transition.',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=70',
  'NESA-Africa awards gala recognition',
  'Recognition',
  '["Public Pre-Nomination Launch","Evidence Education Campaign","Platinum Award TV Show","Africa Education Icon Online TV Show","Gold Recognition Online TV Show","NESA-Africa Momentum Show","Blue Garnet Awards Gala","Rebuild My School Africa Transition"]'::jsonb,
  '[{"label":"View NESA Timeline","to":"/nesa-africa/master-timeline","variant":"secondary"},{"label":"Sponsor NESA-Africa","to":"/wallet/donate?fund=nesa-africa","variant":"heroOutline"},{"label":"Buy Gala Ticket","to":"/nesa-africa/gala-tickets","variant":"heroOutline"}]'::jsonb,
  1
),
(
  'eduaid-africa',
  'EduAid-Africa 2026–2027',
  'Master Timeline 2026–2027',
  'Explore the EduAid-Africa education impact cycle covering scholarships, school support, teacher training, career guidance, girls education, digital learning, monthly webinars, school adoption, and Rebuild My School Africa impact reporting.',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1600&q=70',
  'African students learning in classroom',
  'Impact',
  '["EduAid-Africa Monthly Webinars","My Career, My Life Sessions","Send a Child to School Campaign","Rebuild My School Africa","Teacher Training & Capacity Development","Girls & Women Education Support","eLibrary Africa / eLibrary Nigeria Access","School Adoption & CSR Funding","Local Chapter Education Projects","Impact Reporting & Donor Updates"]'::jsonb,
  '[{"label":"View EduAid Timeline","to":"/eduaid-africa/master-timeline","variant":"default"},{"label":"Sponsor EduAid-Africa","to":"/wallet/donate?fund=eduaid-africa","variant":"outline"},{"label":"Adopt a School","to":"/wallet/donate?fund=adopt-school","variant":"outline"},{"label":"Send a Child to School","to":"/wallet/donate?fund=send-a-child-to-school","variant":"outline"}]'::jsonb,
  2
);
