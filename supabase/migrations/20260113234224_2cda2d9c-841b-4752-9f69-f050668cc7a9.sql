-- Extend app_role enum with new governance/leadership roles
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'hq_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'staff';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'division_lead';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'board_bot';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'board_boa';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'board_bod';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'lcp';

-- Create room_type enum
CREATE TYPE public.room_type AS ENUM (
  'staff_management',
  'division',
  'inter_division',
  'program',
  'governance',
  'lcp_council',
  'chapter'
);

-- Create chat_rooms table
CREATE TABLE public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  room_type public.room_type NOT NULL,
  division_slug TEXT, -- for division rooms
  program_slug TEXT, -- for program rooms
  governance_type TEXT, -- bot, boa, bod
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  external_meeting_link TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create room_members table
CREATE TABLE public.room_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member', -- room-level: admin, moderator, member
  can_vote BOOLEAN DEFAULT true,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  parent_id UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL, -- for threads
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- text, file, system
  file_url TEXT,
  file_name TEXT,
  file_type TEXT,
  file_size INTEGER,
  is_pinned BOOLEAN DEFAULT false,
  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create message_reactions table
CREATE TABLE public.message_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- Create meetings table
CREATE TABLE public.meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  meeting_type TEXT DEFAULT 'instant', -- instant, scheduled
  jitsi_room_name TEXT, -- for Jitsi meetings
  external_link TEXT, -- for Zoom/Teams/Meet
  scheduled_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create decisions table (motions/voting)
CREATE TABLE public.decisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  options JSONB DEFAULT '["Yes", "No", "Abstain"]'::jsonb,
  voting_opens_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  voting_closes_at TIMESTAMP WITH TIME ZONE NOT NULL,
  quorum_count INTEGER,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'open', -- draft, open, closed, cancelled
  result_summary JSONB,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  decision_id UUID NOT NULL REFERENCES public.decisions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  vote_option TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(decision_id, user_id)
);

-- Create decision_audit_logs table
CREATE TABLE public.decision_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  decision_id UUID NOT NULL REFERENCES public.decisions(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- created, opened, closed, voted, cancelled
  actor_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create room_notifications table
CREATE TABLE public.room_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  decision_id UUID REFERENCES public.decisions(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL, -- message, mention, decision, meeting
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decision_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_notifications ENABLE ROW LEVEL SECURITY;

-- Function to check if user is room member
CREATE OR REPLACE FUNCTION public.is_room_member(_user_id UUID, _room_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.room_members
    WHERE user_id = _user_id AND room_id = _room_id
  )
$$;

-- Function to check if user is room admin
CREATE OR REPLACE FUNCTION public.is_room_admin(_user_id UUID, _room_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.room_members
    WHERE user_id = _user_id AND room_id = _room_id AND role = 'admin'
  ) OR public.is_admin(_user_id)
$$;

-- RLS Policies for chat_rooms
CREATE POLICY "Members can view their rooms"
ON public.chat_rooms FOR SELECT
USING (public.is_room_member(auth.uid(), id) OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage rooms"
ON public.chat_rooms FOR ALL
USING (public.is_admin(auth.uid()));

-- RLS Policies for room_members
CREATE POLICY "Members can view room membership"
ON public.room_members FOR SELECT
USING (public.is_room_member(auth.uid(), room_id) OR public.is_admin(auth.uid()));

CREATE POLICY "Room admins can manage members"
ON public.room_members FOR ALL
USING (public.is_room_admin(auth.uid(), room_id));

-- RLS Policies for chat_messages
CREATE POLICY "Members can view room messages"
ON public.chat_messages FOR SELECT
USING (public.is_room_member(auth.uid(), room_id));

CREATE POLICY "Members can send messages"
ON public.chat_messages FOR INSERT
WITH CHECK (public.is_room_member(auth.uid(), room_id) AND sender_id = auth.uid());

CREATE POLICY "Users can edit own messages"
ON public.chat_messages FOR UPDATE
USING (sender_id = auth.uid());

CREATE POLICY "Admins can delete messages"
ON public.chat_messages FOR DELETE
USING (sender_id = auth.uid() OR public.is_room_admin(auth.uid(), room_id));

-- RLS Policies for message_reactions
CREATE POLICY "Members can view reactions"
ON public.message_reactions FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.chat_messages m
  WHERE m.id = message_id AND public.is_room_member(auth.uid(), m.room_id)
));

CREATE POLICY "Members can add reactions"
ON public.message_reactions FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chat_messages m
  WHERE m.id = message_id AND public.is_room_member(auth.uid(), m.room_id)
) AND user_id = auth.uid());

CREATE POLICY "Users can remove own reactions"
ON public.message_reactions FOR DELETE
USING (user_id = auth.uid());

-- RLS Policies for meetings
CREATE POLICY "Members can view room meetings"
ON public.meetings FOR SELECT
USING (public.is_room_member(auth.uid(), room_id));

CREATE POLICY "Room admins can manage meetings"
ON public.meetings FOR ALL
USING (public.is_room_admin(auth.uid(), room_id));

-- RLS Policies for decisions
CREATE POLICY "Members can view decisions"
ON public.decisions FOR SELECT
USING (public.is_room_member(auth.uid(), room_id));

CREATE POLICY "Room admins can manage decisions"
ON public.decisions FOR INSERT
WITH CHECK (public.is_room_admin(auth.uid(), room_id));

CREATE POLICY "Room admins can update decisions"
ON public.decisions FOR UPDATE
USING (public.is_room_admin(auth.uid(), room_id));

-- RLS Policies for votes
CREATE POLICY "Members can view votes in non-anonymous decisions"
ON public.votes FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.decisions d
  WHERE d.id = decision_id
    AND public.is_room_member(auth.uid(), d.room_id)
    AND (d.is_anonymous = false OR user_id = auth.uid() OR public.is_admin(auth.uid()))
));

CREATE POLICY "Eligible members can vote"
ON public.votes FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.decisions d
    JOIN public.room_members rm ON rm.room_id = d.room_id
    WHERE d.id = decision_id
      AND rm.user_id = auth.uid()
      AND rm.can_vote = true
      AND d.status = 'open'
      AND now() BETWEEN d.voting_opens_at AND d.voting_closes_at
  )
);

-- RLS Policies for decision_audit_logs
CREATE POLICY "Members can view audit logs"
ON public.decision_audit_logs FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.decisions d
  WHERE d.id = decision_id AND public.is_room_member(auth.uid(), d.room_id)
));

CREATE POLICY "System can insert audit logs"
ON public.decision_audit_logs FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for room_notifications
CREATE POLICY "Users can view own notifications"
ON public.room_notifications FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
ON public.room_notifications FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own notifications"
ON public.room_notifications FOR UPDATE
USING (user_id = auth.uid());

-- Enable realtime for chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.decisions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;

-- Trigger for updated_at
CREATE TRIGGER update_chat_rooms_updated_at
BEFORE UPDATE ON public.chat_rooms
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at
BEFORE UPDATE ON public.chat_messages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_decisions_updated_at
BEFORE UPDATE ON public.decisions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default rooms
INSERT INTO public.chat_rooms (name, description, room_type, icon) VALUES
('SCEF Staff & Management', 'Central hub for all staff and management discussions', 'staff_management', 'building'),
('BGEO Room', 'Board Governance & Ethics Oversight division discussions', 'division', 'shield'),
('SOBCD Room', 'Strategy, Operations, Budget & Compliance division discussions', 'division', 'briefcase'),
('TDSD Room', 'Technology, Data & Systems division discussions', 'division', 'cpu'),
('OMBDD Room', 'Outreach, Membership, Brand & Development division discussions', 'division', 'users'),
('Santos Media Room', 'Media production and broadcasting coordination', 'division', 'video'),
('LCS Room', 'Local Chapter Support division discussions', 'division', 'map-pin'),
('Inter-Division Coordination', 'Cross-division collaboration and coordination', 'inter_division', 'network'),
('NESA-Africa Program Team', 'National Education Standards Assessment program coordination', 'program', 'award'),
('EduAid-Africa Program Team', 'Educational aid and scholarship program coordination', 'program', 'heart'),
('Rebuild My School Africa Team', 'School infrastructure restoration program', 'program', 'building-2'),
('Women & Girls Education Team', 'Gender-inclusive education initiatives', 'program', 'users'),
('Special Needs Education Team', 'Inclusive education for learners with special needs', 'program', 'accessibility'),
('Education Online Africa Team', 'Digital learning platform coordination', 'program', 'monitor'),
('eLibrary Nigeria Team', 'Digital library resources management', 'program', 'book-open'),
('Certification & Endorsement Team', 'AEPC certification services coordination', 'program', 'badge-check'),
('Board of Trustees (BOT)', 'Governance oversight and fiduciary responsibility', 'governance', 'crown'),
('Board of Advisers (BOA)', 'Strategic advisory discussions', 'governance', 'lightbulb'),
('Board of Directors (BOD)', 'Executive leadership and operations', 'governance', 'briefcase'),
('All Local Chapter Presidents', 'LCP Council for chapter leadership coordination', 'lcp_council', 'globe');

-- Update division_slug for division rooms
UPDATE public.chat_rooms SET division_slug = 'bgeo' WHERE name = 'BGEO Room';
UPDATE public.chat_rooms SET division_slug = 'sobcd' WHERE name = 'SOBCD Room';
UPDATE public.chat_rooms SET division_slug = 'tdsd' WHERE name = 'TDSD Room';
UPDATE public.chat_rooms SET division_slug = 'ombdd' WHERE name = 'OMBDD Room';
UPDATE public.chat_rooms SET division_slug = 'santos-media' WHERE name = 'Santos Media Room';
UPDATE public.chat_rooms SET division_slug = 'lcs' WHERE name = 'LCS Room';

-- Update program_slug for program rooms
UPDATE public.chat_rooms SET program_slug = 'nesa-africa' WHERE name = 'NESA-Africa Program Team';
UPDATE public.chat_rooms SET program_slug = 'eduaid-africa' WHERE name = 'EduAid-Africa Program Team';
UPDATE public.chat_rooms SET program_slug = 'rebuild-my-school-africa' WHERE name = 'Rebuild My School Africa Team';
UPDATE public.chat_rooms SET program_slug = 'women-girls-education' WHERE name = 'Women & Girls Education Team';
UPDATE public.chat_rooms SET program_slug = 'special-needs-education' WHERE name = 'Special Needs Education Team';
UPDATE public.chat_rooms SET program_slug = 'education-online-africa' WHERE name = 'Education Online Africa Team';
UPDATE public.chat_rooms SET program_slug = 'elibrary-nigeria' WHERE name = 'eLibrary Nigeria Team';
UPDATE public.chat_rooms SET program_slug = 'certification' WHERE name = 'Certification & Endorsement Team';

-- Update governance_type for governance rooms
UPDATE public.chat_rooms SET governance_type = 'bot' WHERE name = 'Board of Trustees (BOT)';
UPDATE public.chat_rooms SET governance_type = 'boa' WHERE name = 'Board of Advisers (BOA)';
UPDATE public.chat_rooms SET governance_type = 'bod' WHERE name = 'Board of Directors (BOD)';