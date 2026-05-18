
CREATE TABLE public.waitlist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  country TEXT NOT NULL,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  source TEXT NOT NULL DEFAULT 'seychelles-2027-waiting-list',
  submission_status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX waitlist_submissions_unique_entry
  ON public.waitlist_submissions (lower(full_name), lower(organization), source);

ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert
CREATE POLICY "Anyone can join waiting list"
  ON public.waitlist_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(full_name) >= 2
    AND char_length(organization) >= 2
    AND char_length(country) >= 1
    AND char_length(role) >= 1
  );

-- No public SELECT policy => rows are private.

-- Safe counter function exposed to everyone
CREATE OR REPLACE FUNCTION public.get_waitlist_count(_source TEXT)
RETURNS BIGINT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::BIGINT
  FROM public.waitlist_submissions
  WHERE source = _source;
$$;

GRANT EXECUTE ON FUNCTION public.get_waitlist_count(TEXT) TO anon, authenticated;
