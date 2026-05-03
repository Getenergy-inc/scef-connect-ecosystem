ALTER TABLE public.scholarship_exam_attempts
  ADD COLUMN IF NOT EXISTS is_preview boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS scholarship_exam_attempts_is_preview_idx
  ON public.scholarship_exam_attempts (is_preview);