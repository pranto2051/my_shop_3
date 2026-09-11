-- ============================================================
-- FIX ADMIN PERMISSIONS & RLS POLICIES FOR STAFF MANAGEMENT
-- Run this in your Supabase SQL Editor to allow public read/update
-- on users and user_roles tables from the Admin Panel.
-- ============================================================

-- 1. Allow reading user_roles publicly so staff roles display properly
DROP POLICY IF EXISTS "Users: view own roles" ON public.user_roles;
CREATE POLICY "Public: read user_roles" ON public.user_roles 
  FOR SELECT USING (true);

-- 2. Allow updating users table from Admin Panel
DROP POLICY IF EXISTS "Admin: manage users" ON public.users;
CREATE POLICY "Public: manage users" ON public.users 
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Allow updating user_roles table from Admin Panel
DROP POLICY IF EXISTS "Admin: manage user_roles" ON public.user_roles;
CREATE POLICY "Public: manage user_roles" ON public.user_roles 
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Grant privileges to anon and authenticated roles
GRANT ALL ON public.users TO anon, authenticated, service_role;
GRANT ALL ON public.user_roles TO anon, authenticated, service_role;

-- 5. Ensure constraint on user_roles allows admin, manager, staff, employee
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check 
  CHECK (role IN ('admin', 'employee', 'manager', 'staff', 'support'));

NOTIFY pgrst, 'reload schema';
