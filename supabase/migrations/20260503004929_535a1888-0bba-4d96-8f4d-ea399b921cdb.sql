-- =========================================================
-- Scholarship online exam: exams, questions, attempts, answers
-- =========================================================

CREATE TABLE public.scholarship_exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  category_slug text,                 -- maps to SCHOLARSHIP_CATEGORIES (vocational/college/tertiary/professional) or NULL = all
  duration_minutes integer NOT NULL DEFAULT 30 CHECK (duration_minutes BETWEEN 1 AND 240),
  pass_score_percent integer NOT NULL DEFAULT 60 CHECK (pass_score_percent BETWEEN 0 AND 100),
  max_attempts integer NOT NULL DEFAULT 1 CHECK (max_attempts >= 1),
  opens_at timestamptz,
  closes_at timestamptz,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.scholarship_exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.scholarship_exams(id) ON DELETE CASCADE,
  position integer NOT NULL,
  prompt text NOT NULL,
  options jsonb NOT NULL,             -- ["A","B","C","D"]
  correct_index integer NOT NULL,     -- 0-based index; PRIVATE (RLS hides from clients)
  points integer NOT NULL DEFAULT 1 CHECK (points >= 1),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (exam_id, position)
);
CREATE INDEX idx_exam_questions_exam ON public.scholarship_exam_questions(exam_id, position);

CREATE TABLE public.scholarship_exam_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.scholarship_exams(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  application_id uuid,                -- optional link to applications.id
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','submitted','expired')),
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  submitted_at timestamptz,
  score_points integer,
  total_points integer,
  score_percent numeric(5,2),
  passed boolean,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_exam_attempts_user ON public.scholarship_exam_attempts(user_id, exam_id, started_at DESC);

CREATE TABLE public.scholarship_exam_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES public.scholarship_exam_attempts(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.scholarship_exam_questions(id) ON DELETE CASCADE,
  selected_index integer,             -- nullable = unanswered
  answered_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (attempt_id, question_id)
);
CREATE INDEX idx_exam_answers_attempt ON public.scholarship_exam_answers(attempt_id);

-- updated_at triggers
CREATE TRIGGER trg_exams_updated
  BEFORE UPDATE ON public.scholarship_exams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_attempts_updated
  BEFORE UPDATE ON public.scholarship_exam_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- RLS
-- =========================
ALTER TABLE public.scholarship_exams           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_exam_questions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_exam_attempts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_exam_answers    ENABLE ROW LEVEL SECURITY;

-- Exams: published exams readable by authenticated users; admins manage
CREATE POLICY "Published exams readable by authenticated"
  ON public.scholarship_exams FOR SELECT TO authenticated
  USING (is_published = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins manage exams"
  ON public.scholarship_exams FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Questions: NEVER expose correct_index to clients.
-- Only admins can SELECT directly; the edge function uses the service role.
CREATE POLICY "Admins read questions"
  ON public.scholarship_exam_questions FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins manage questions"
  ON public.scholarship_exam_questions FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Attempts: users see/create their own; admins see all; only edge function (service role) updates score fields
CREATE POLICY "Users view own attempts"
  ON public.scholarship_exam_attempts FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Users create own attempts"
  ON public.scholarship_exam_attempts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins update attempts"
  ON public.scholarship_exam_attempts FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()));

-- Answers: users can view + upsert their own answers while attempt is in_progress
CREATE POLICY "Users view own answers"
  ON public.scholarship_exam_answers FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.scholarship_exam_attempts a
      WHERE a.id = attempt_id AND (a.user_id = auth.uid() OR public.is_admin(auth.uid()))
    )
  );

CREATE POLICY "Users insert own answers in progress"
  ON public.scholarship_exam_answers FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.scholarship_exam_attempts a
      WHERE a.id = attempt_id
        AND a.user_id = auth.uid()
        AND a.status = 'in_progress'
        AND a.expires_at > now()
    )
  );

CREATE POLICY "Users update own answers in progress"
  ON public.scholarship_exam_answers FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.scholarship_exam_attempts a
      WHERE a.id = attempt_id
        AND a.user_id = auth.uid()
        AND a.status = 'in_progress'
        AND a.expires_at > now()
    )
  );
