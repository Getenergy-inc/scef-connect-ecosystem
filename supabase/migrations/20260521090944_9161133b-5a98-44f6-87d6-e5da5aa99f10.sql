
CREATE TABLE public.chapter_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  chapter_type TEXT NOT NULL,
  participation_mode TEXT NOT NULL DEFAULT 'member',
  motivation TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chapter_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit chapter signup"
  ON public.chapter_signups FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view chapter signups"
  ON public.chapter_signups FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update chapter signups"
  ON public.chapter_signups FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete chapter signups"
  ON public.chapter_signups FOR DELETE
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_chapter_signups_updated_at
  BEFORE UPDATE ON public.chapter_signups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
