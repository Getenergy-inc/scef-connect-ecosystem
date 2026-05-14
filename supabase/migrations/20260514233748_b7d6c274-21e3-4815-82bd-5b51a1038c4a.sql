
-- Categories
CREATE TABLE public.sophia_faq_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FAQs
CREATE TABLE public.sophia_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_number INTEGER,
  category TEXT NOT NULL,
  subcategory TEXT,
  question TEXT NOT NULL,
  short_answer TEXT NOT NULL,
  full_answer TEXT,
  keywords TEXT[] DEFAULT '{}',
  related_program TEXT,
  audience_type TEXT,
  support_channel TEXT,
  priority_level TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'published',
  language TEXT NOT NULL DEFAULT 'en',
  source TEXT,
  related_url TEXT,
  escalation_required BOOLEAN NOT NULL DEFAULT false,
  escalation_department TEXT,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sophia_faqs_category ON public.sophia_faqs(category);
CREATE INDEX idx_sophia_faqs_status ON public.sophia_faqs(status);
CREATE INDEX idx_sophia_faqs_program ON public.sophia_faqs(related_program);
CREATE INDEX idx_sophia_faqs_keywords ON public.sophia_faqs USING GIN(keywords);
CREATE INDEX idx_sophia_faqs_fts ON public.sophia_faqs USING GIN (
  to_tsvector('english', coalesce(question,'') || ' ' || coalesce(short_answer,'') || ' ' || coalesce(full_answer,''))
);

-- Conversations
CREATE TABLE public.sophia_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  user_name TEXT,
  user_phone TEXT,
  user_email TEXT,
  channel TEXT NOT NULL,
  question_text TEXT NOT NULL,
  detected_intent TEXT,
  matched_faq_id UUID REFERENCES public.sophia_faqs(id) ON DELETE SET NULL,
  response_text TEXT,
  confidence_score NUMERIC,
  escalation_required BOOLEAN NOT NULL DEFAULT false,
  escalation_department TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  assigned_to UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sophia_conv_status ON public.sophia_conversations(status);
CREATE INDEX idx_sophia_conv_user ON public.sophia_conversations(user_id);

-- Unanswered
CREATE TABLE public.sophia_unanswered_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.sophia_conversations(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  suggested_category TEXT,
  user_contact TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review',
  admin_notes TEXT,
  converted_to_faq_id UUID REFERENCES public.sophia_faqs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Feedback
CREATE TABLE public.sophia_faq_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id UUID NOT NULL REFERENCES public.sophia_faqs(id) ON DELETE CASCADE,
  user_identifier TEXT,
  rating INTEGER CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5)),
  was_helpful BOOLEAN,
  comment TEXT,
  channel TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sophia_feedback_faq ON public.sophia_faq_feedback(faq_id);

-- Triggers
CREATE TRIGGER trg_sophia_faqs_updated BEFORE UPDATE ON public.sophia_faqs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_sophia_conv_updated BEFORE UPDATE ON public.sophia_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_sophia_unanswered_updated BEFORE UPDATE ON public.sophia_unanswered_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.sophia_faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sophia_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sophia_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sophia_unanswered_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sophia_faq_feedback ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Active categories public read" ON public.sophia_faq_categories
  FOR SELECT USING (is_active = true OR public.is_admin(auth.uid()));
CREATE POLICY "Admins manage categories" ON public.sophia_faq_categories
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- FAQ policies
CREATE POLICY "Published FAQs public read" ON public.sophia_faqs
  FOR SELECT USING (status = 'published' OR public.is_admin(auth.uid()));
CREATE POLICY "Admins manage FAQs" ON public.sophia_faqs
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- Conversations policies
CREATE POLICY "Anyone can submit conversation" ON public.sophia_conversations
  FOR INSERT WITH CHECK (
    length(question_text) BETWEEN 1 AND 5000
    AND length(coalesce(user_name,'')) <= 200
    AND length(coalesce(user_email,'')) <= 255
    AND length(coalesce(user_phone,'')) <= 50
  );
CREATE POLICY "Users view own conversations" ON public.sophia_conversations
  FOR SELECT USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR public.is_admin(auth.uid())
  );
CREATE POLICY "Admins manage conversations" ON public.sophia_conversations
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- Unanswered policies
CREATE POLICY "Anyone can submit unanswered" ON public.sophia_unanswered_questions
  FOR INSERT WITH CHECK (length(question_text) BETWEEN 1 AND 5000);
CREATE POLICY "Admins manage unanswered" ON public.sophia_unanswered_questions
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- Feedback policies
CREATE POLICY "Anyone can submit feedback" ON public.sophia_faq_feedback
  FOR INSERT WITH CHECK (length(coalesce(comment,'')) <= 2000);
CREATE POLICY "Admins read feedback" ON public.sophia_faq_feedback
  FOR SELECT USING (public.is_admin(auth.uid()));

-- Seed categories
INSERT INTO public.sophia_faq_categories (name, slug, display_order) VALUES
  ('General SCEF','general-scef',1),('Membership','membership',2),('Ambassadors','ambassadors',3),
  ('Volunteers','volunteers',4),('Internships','internships',5),('EduAid-Africa','eduaid-africa',6),
  ('NESA-Africa','nesa-africa',7),('GFA Wallet','gfa-wallet',8),('Payments','payments',9),
  ('Donations','donations',10),('Sponsorship','sponsorship',11),('Partnerships','partnerships',12),
  ('Local Chapters','local-chapters',13),('Training & Webinars','training-webinars',14),
  ('Monthly Advocacy Calendar','monthly-advocacy',15),('ESG & Sustainability','esg-sustainability',16),
  ('Health Education Advocacy','health-education',17),('Girls & Women Education','girls-women-education',18),
  ('Teacher Development','teacher-development',19),('Teacher Wellbeing','teacher-wellbeing',20),
  ('eLibrary Africa','elibrary-africa',21),('Education Online Africa','education-online-africa',22),
  ('My Career My Life','my-career-my-life',23),('Rebuild My School Africa','rebuild-my-school',24),
  ('Send a Child to School','send-a-child',25),('NESA TV','nesa-tv',26),
  ('It''s In Me Radio','its-in-me-radio',27),('Media Archive','media-archive',28),
  ('Events & Gala','events-gala',29),('Blue Garnet Awards Gala','blue-garnet-gala',30),
  ('Sophia Support','sophia-support',31),('Technical Support','technical-support',32),
  ('Governance & Compliance','governance-compliance',33),('Impact Reporting','impact-reporting',34),
  ('Diaspora Engagement','diaspora-engagement',35),('CSR','csr',36),
  ('School Support','school-support',37),('Scholarship Support','scholarship-support',38),
  ('Merchandise','merchandise',39),('Edu-Tourism','edu-tourism',40);

-- Seed starter FAQs
INSERT INTO public.sophia_faqs (faq_number, category, question, short_answer, keywords, related_program, audience_type, support_channel, status) VALUES
  (1,'General SCEF','What is SCEF?','SCEF (Santos Creations Educational Foundation) is a Pan-African nonprofit advancing education, advocacy, ESG, health, and youth empowerment across Africa.',ARRAY['SCEF','about','foundation','NGO'],'SCEF','General Public','Website FAQ','published'),
  (2,'General SCEF','What does SCEF stand for?','Santos Creations Educational Foundation.',ARRAY['SCEF','acronym','meaning'],'SCEF','General Public','Website FAQ','published'),
  (3,'Membership','How can I become a member?','Visit /get-involved/membership, choose your tier, complete the form, and pay your membership fee via GFA Wallet.',ARRAY['membership','join','register'],'SCEF','General Public','Website FAQ','published'),
  (4,'Donations','How can I donate?','Donate securely via GFA Wallet at /wallet/donate, or use one of our verified Providus Bank accounts at /payments.',ARRAY['donate','donation','give'],'SCEF','Donor','Website FAQ','published'),
  (5,'EduAid-Africa','What is EduAid-Africa?','EduAid-Africa is SCEF''s scholarship and school-support program providing tuition, learning materials, and mentorship to vulnerable learners.',ARRAY['eduaid','scholarship','education'],'EduAid-Africa','General Public','Website FAQ','published'),
  (6,'NESA-Africa','What is NESA-Africa?','NESA-Africa is the New Education Standard Awards Africa, recognising excellence and impact in African education across 135+ subcategories.',ARRAY['nesa','awards','recognition'],'NESA-Africa','General Public','Website FAQ','published'),
  (7,'GFA Wallet','What is GFA Wallet?','GFA Wallet is SCEF''s official payment layer powering all donations, memberships, sponsorships, ticketing, and merchandise transactions.',ARRAY['wallet','gfa','payment'],'GFA Wallet','General Public','Website FAQ','published'),
  (8,'GFA Wallet','How do I pay via GFA Wallet?','Click any "Pay via GFA Wallet" button, sign in or continue as a guest, choose your fund or purpose, and confirm payment.',ARRAY['pay','wallet','checkout'],'GFA Wallet','General Public','Website FAQ','published'),
  (9,'Sophia Support','What is Sophia?','Sophia is SCEF''s official support assistant available on WhatsApp and the website to help you navigate programs, payments, and membership.',ARRAY['sophia','assistant','support'],'SCEF','General Public','Sophia WhatsApp','published'),
  (10,'Sophia Support','How do I contact Sophia?','Chat with Sophia on WhatsApp at +234 810 976 5897 or via wa.me/2348109765897.',ARRAY['contact','sophia','whatsapp'],'SCEF','General Public','Sophia WhatsApp','published'),
  (11,'Sponsorship','How can I sponsor NESA-Africa?','Visit the NESA-Africa Sponsor page, select a sponsorship tier or category, and pay via GFA Wallet or bank transfer.',ARRAY['sponsor','nesa','sponsorship'],'NESA-Africa','Sponsor','Website FAQ','published'),
  (12,'EduAid-Africa','How can I support EduAid-Africa?','Donate, sponsor a scholarship, fund a school, or partner with us via /programs/eduaid-africa.',ARRAY['eduaid','support','donate'],'EduAid-Africa','Donor','Website FAQ','published'),
  (13,'Local Chapters','How can I join a local chapter?','Browse chapters at /chapters, select your country/state/city, and apply to join online.',ARRAY['chapter','join','local'],'SCEF','General Public','Website FAQ','published'),
  (14,'Ambassadors','How can I become an ambassador?','Apply via /get-involved/ambassador, select your tier and advocacy focus, and complete onboarding.',ARRAY['ambassador','advocate'],'SCEF','General Public','Website FAQ','published'),
  (15,'Volunteers','How can I volunteer?','Apply at /get-involved/volunteer with your skills, availability, and program interests.',ARRAY['volunteer','help'],'SCEF','Volunteer','Website FAQ','published'),
  (16,'Training & Webinars','How can I register for webinars?','Visit /media/webinars or the Calendar page to see upcoming webinars and register online.',ARRAY['webinar','training','register'],'SCEF','General Public','Website FAQ','published'),
  (17,'Rebuild My School Africa','What is Rebuild My School Africa?','RMSA is SCEF''s school infrastructure program rebuilding and equipping vulnerable schools across Africa.',ARRAY['rmsa','school','rebuild'],'Rebuild My School Africa','General Public','Website FAQ','published'),
  (18,'Send a Child to School','What is Send a Child to School?','A targeted SCEF program sponsoring tuition, uniforms, and learning materials so out-of-school children can return to learning.',ARRAY['send a child','sponsor','school'],'Send a Child to School','Donor','Website FAQ','published'),
  (19,'eLibrary Africa','What is eLibrary Africa?','SCEF''s digital library giving learners access to books, courses, and learning resources across Africa.',ARRAY['elibrary','library','digital'],'eLibrary Africa','Student','Website FAQ','published'),
  (20,'My Career My Life','What is My Career My Life?','A youth career-pathway program offering mentorship, training, and job-readiness support for African youth.',ARRAY['career','youth','mentorship'],'My Career My Life','Student','Website FAQ','published');
