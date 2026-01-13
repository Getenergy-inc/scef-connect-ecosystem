-- Create chapter_inbox threads table for chapter correspondence
CREATE TABLE public.chapter_inbox_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chapter_inbox_messages table
CREATE TABLE public.chapter_inbox_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES public.chapter_inbox_threads(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'chapter', 'system')),
  sender_id UUID,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bank_accounts table for disbursements
CREATE TABLE public.bank_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_type TEXT NOT NULL CHECK (owner_type IN ('scef', 'chapter', 'program', 'user')),
  owner_id UUID,
  bank_name TEXT NOT NULL,
  account_number_masked TEXT NOT NULL,
  account_name TEXT NOT NULL,
  routing_number TEXT,
  country TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_docs TEXT[],
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create disbursement_requests table
CREATE TABLE public.disbursement_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requested_by UUID NOT NULL,
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
  bank_account_id UUID REFERENCES public.bank_accounts(id) NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processing', 'completed', 'failed')),
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_logs table for all financial transactions
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  user_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add relationship_to_country column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS relationship_to_country TEXT CHECK (relationship_to_country IN ('resident', 'diaspora', 'friend'));

-- Add chapter_id to profiles for chapter assignment
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS chapter_id UUID REFERENCES public.chapters(id);

-- Enable RLS on new tables
ALTER TABLE public.chapter_inbox_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_inbox_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disbursement_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chapter_inbox_threads
CREATE POLICY "Users can view their own threads"
ON public.chapter_inbox_threads FOR SELECT
USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users can create threads"
ON public.chapter_inbox_threads FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chapter_inbox_messages
CREATE POLICY "Users can view messages in their threads"
ON public.chapter_inbox_messages FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.chapter_inbox_threads 
  WHERE id = thread_id AND (user_id = auth.uid() OR is_admin(auth.uid()))
));

CREATE POLICY "Users can send messages to their threads"
ON public.chapter_inbox_messages FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chapter_inbox_threads 
  WHERE id = thread_id AND user_id = auth.uid()
) OR is_admin(auth.uid()));

-- RLS Policies for bank_accounts
CREATE POLICY "Admins can manage bank accounts"
ON public.bank_accounts FOR ALL
USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own bank accounts"
ON public.bank_accounts FOR SELECT
USING (owner_type = 'user' AND owner_id = auth.uid());

-- RLS Policies for disbursement_requests
CREATE POLICY "Admins can manage disbursements"
ON public.disbursement_requests FOR ALL
USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own disbursement requests"
ON public.disbursement_requests FOR SELECT
USING (requested_by = auth.uid());

-- RLS Policies for audit_logs (read-only for admins)
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "System can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (true);

-- Create function to log audit entries
CREATE OR REPLACE FUNCTION public.log_audit(
  p_action_type TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO public.audit_logs (action_type, entity_type, entity_id, user_id, old_values, new_values)
  VALUES (p_action_type, p_entity_type, p_entity_id, COALESCE(p_user_id, auth.uid()), p_old_values, p_new_values)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- Create triggers for updated_at columns
CREATE TRIGGER update_bank_accounts_updated_at
BEFORE UPDATE ON public.bank_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_disbursement_requests_updated_at
BEFORE UPDATE ON public.disbursement_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();