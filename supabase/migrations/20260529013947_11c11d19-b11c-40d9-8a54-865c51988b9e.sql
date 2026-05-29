
-- Sophia Visitor Analytics tables
CREATE TABLE IF NOT EXISTS public.sophia_visitor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_id UUID,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  ip_hash TEXT,
  country TEXT,
  country_code TEXT,
  region TEXT,
  city TEXT,
  timezone TEXT,
  page_url TEXT,
  page_title TEXT,
  referrer_url TEXT,
  source_channel TEXT,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  faq_category TEXT,
  related_program TEXT,
  audience_type TEXT,
  event_type TEXT NOT NULL,
  event_label TEXT,
  question_text TEXT,
  matched_faq_id UUID REFERENCES public.sophia_faqs(id) ON DELETE SET NULL,
  escalation_required BOOLEAN NOT NULL DEFAULT false,
  escalation_department TEXT,
  whatsapp_clicked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sva_visitor ON public.sophia_visitor_analytics(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sva_session ON public.sophia_visitor_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_sva_event ON public.sophia_visitor_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_sva_country ON public.sophia_visitor_analytics(country_code);
CREATE INDEX IF NOT EXISTS idx_sva_created ON public.sophia_visitor_analytics(created_at DESC);

GRANT INSERT ON public.sophia_visitor_analytics TO anon, authenticated;
GRANT SELECT ON public.sophia_visitor_analytics TO authenticated;
GRANT ALL ON public.sophia_visitor_analytics TO service_role;

ALTER TABLE public.sophia_visitor_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visitor events"
  ON public.sophia_visitor_analytics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all analytics"
  ON public.sophia_visitor_analytics
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete analytics"
  ON public.sophia_visitor_analytics
  FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Daily summary
CREATE TABLE IF NOT EXISTS public.sophia_visitor_daily_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  summary_date DATE NOT NULL,
  country TEXT,
  country_code TEXT,
  total_visitors INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  total_page_views INTEGER NOT NULL DEFAULT 0,
  total_faq_views INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  total_auto_answers INTEGER NOT NULL DEFAULT 0,
  total_unanswered INTEGER NOT NULL DEFAULT 0,
  total_escalations INTEGER NOT NULL DEFAULT 0,
  total_whatsapp_clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (summary_date, country_code)
);

CREATE INDEX IF NOT EXISTS idx_svds_date ON public.sophia_visitor_daily_summary(summary_date DESC);

GRANT SELECT ON public.sophia_visitor_daily_summary TO authenticated;
GRANT ALL ON public.sophia_visitor_daily_summary TO service_role;

ALTER TABLE public.sophia_visitor_daily_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view daily summary"
  ON public.sophia_visitor_daily_summary
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER trg_svds_updated_at
  BEFORE UPDATE ON public.sophia_visitor_daily_summary
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
