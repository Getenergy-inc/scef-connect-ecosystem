create table if not exists public.webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  program_slug text not null,
  program_month text not null,
  program_title text not null,
  full_name text not null,
  email text not null,
  phone text,
  country text,
  organization text,
  role_type text,
  participation_mode text not null default 'Online',
  consent_marketing boolean not null default false,
  user_id uuid,
  confirmation_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists webinar_registrations_slug_idx on public.webinar_registrations(program_slug);
create index if not exists webinar_registrations_email_idx on public.webinar_registrations(email);

alter table public.webinar_registrations enable row level security;

create policy "Anyone can register for a webinar"
  on public.webinar_registrations
  for insert
  to anon, authenticated
  with check (true);

create policy "Users can view their own registrations"
  on public.webinar_registrations
  for select
  to authenticated
  using (
    auth.uid() is not null
    and (
      user_id = auth.uid()
      or email = (select email from public.profiles where user_id = auth.uid())
    )
  );

create policy "Admins can view all registrations"
  on public.webinar_registrations
  for select
  to authenticated
  using (public.is_admin(auth.uid()));

create policy "Admins can update registrations"
  on public.webinar_registrations
  for update
  to authenticated
  using (public.is_admin(auth.uid()));