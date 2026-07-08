create table public.support_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  phone text,
  topic text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant insert on public.support_submissions to anon;
grant insert, select on public.support_submissions to authenticated;
grant all on public.support_submissions to service_role;

alter table public.support_submissions enable row level security;

create policy "Anyone can submit a support request"
on public.support_submissions
for insert
to anon, authenticated
with check (true);

create policy "Users can view own submissions"
on public.support_submissions
for select
to authenticated
using (email = auth.email());