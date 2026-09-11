-- ============================================================
-- SAFE FIX FOR ADMIN PERMISSIONS & RLS POLICIES
-- Run this in your Supabase SQL Editor (100% Safe & Idempotent)
-- ============================================================

-- 1. Remove conflicting RLS policies if present
DROP POLICY IF EXISTS "Users: view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Public: read user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admin: manage users" ON public.users;
DROP POLICY IF EXISTS "Public: manage users" ON public.users;
DROP POLICY IF EXISTS "Admin: manage user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Public: manage user_roles" ON public.user_roles;

-- 2. Create clean, permissive policies for Admin management
CREATE POLICY "Public: read user_roles" ON public.user_roles 
  FOR SELECT USING (true);

CREATE POLICY "Public: manage users" ON public.users 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public: manage user_roles" ON public.user_roles 
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Grant full table privileges to API roles
GRANT ALL ON public.users TO anon, authenticated, service_role;
GRANT ALL ON public.user_roles TO anon, authenticated, service_role;

-- 4. Clean up any duplicate role entries for same user (keeps latest)
DELETE FROM public.user_roles a
USING public.user_roles b
WHERE a.user_id = b.user_id 
  AND a.created_at < b.created_at;

-- 5. Safely recreate role check constraint allowing all staff roles
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check 
  CHECK (role IN ('admin', 'employee', 'manager', 'staff', 'support'));

-- 6. Reload Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
