-- SUPABASE POSTGRESQL SCHEMA FOR BRACU FACULTY PORTAL

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text default 'student' check (role in ('student', 'faculty', 'admin')),
  created_at timestamptz default now()
);

-- Trigger for auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. FACULTY
create table if not exists public.faculty (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  designation text not null,
  department text not null default 'Computer Science and Engineering',
  image_url text,
  profile_url text,
  email text,
  room text,
  created_at timestamptz default now()
);

-- 3. SAVED FACULTY
create table if not exists public.saved_faculty (
  user_id uuid references public.profiles(id) on delete cascade,
  faculty_id uuid references public.faculty(id) on delete cascade,
  saved_at timestamptz default now(),
  primary key (user_id, faculty_id)
);

-- 4. FACULTY UPDATES
create table if not exists public.faculty_updates (
  id uuid default gen_random_uuid() primary key,
  faculty_id uuid references public.faculty(id) on delete set null,
  title text not null,
  content text not null,
  category text default 'general' check (category in ('general', 'academic', 'urgent')),
  created_at timestamptz default now()
);

-- 5. EXAM SCHEDULES
create table if not exists public.exam_schedules (
  id uuid default gen_random_uuid() primary key,
  course_code text not null,
  course_title text not null,
  exam_date date not null,
  start_time time not null,
  end_time time not null,
  room text not null,
  faculty_id uuid references public.faculty(id) on delete set null,
  created_at timestamptz default now()
);

-- INDEXES
create index if not exists idx_faculty_dept on public.faculty(department);
create index if not exists idx_saved_faculty_user on public.saved_faculty(user_id);
create index if not exists idx_exam_date on public.exam_schedules(exam_date);

-- ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.faculty enable row level security;
alter table public.saved_faculty enable row level security;
alter table public.faculty_updates enable row level security;
alter table public.exam_schedules enable row level security;

-- POLICIES
create policy "Public profiles read" on public.profiles for select using (true);
create policy "User edit own profile" on public.profiles for update using (auth.uid() = id);

create policy "Public read faculty" on public.faculty for select using (true);
create policy "Admin edit faculty" on public.faculty for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "User read own saved" on public.saved_faculty for select using (auth.uid() = user_id);
create policy "User insert own saved" on public.saved_faculty for insert with check (auth.uid() = user_id);
create policy "User delete own saved" on public.saved_faculty for delete using (auth.uid() = user_id);

create policy "Public read updates" on public.faculty_updates for select using (true);
create policy "Admin edit updates" on public.faculty_updates for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Public read exams" on public.exam_schedules for select using (true);
create policy "Admin edit exams" on public.exam_schedules for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
