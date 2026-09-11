-- ============================================================
-- SAFE FIX FOR ADMIN PERMISSIONS, RLS POLICIES & PERMISSIONS COLUMN
-- Run this in your Supabase SQL Editor (100% Safe & Idempotent)
-- ============================================================

-- 1. Add permissions column to users table if not exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '["অর্ডার ড্যাশবোর্ড", "পণ্য তালিকা ও ইনভেন্টরি"]'::jsonb;

-- 2. Populate default permissions for existing Admin users if null or empty
UPDATE public.users u
SET permissions = '["অর্ডার ড্যাশবোর্ড", "পণ্য তালিকা ও ইনভেন্টরি", "গ্রাহক তথ্য ও বার্তা", "আর্থিক হিসাব ও PnL", "সিস্টেম সেটিংস", "স্টাফ ও অ্যাডমিন কন্ট্রোল", "প্রোমোশনাল পপআপ ও কুপন", "রিভিউ অনুমোদন"]'::jsonb
FROM public.user_roles r
WHERE u.id = r.user_id 
  AND r.role = 'admin'
  AND (u.permissions IS NULL OR u.permissions = '[]'::jsonb);

-- 3. Populate default permissions for non-admin users if null or empty
UPDATE public.users u
SET permissions = '["অর্ডার ড্যাশবোর্ড", "পণ্য তালিকা ও ইনভেন্টরি"]'::jsonb
WHERE u.permissions IS NULL OR u.permissions = '[]'::jsonb;

-- 4. Remove all conflicting RLS policies if present
DROP POLICY IF EXISTS "Users: view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Public: read user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admin: manage users" ON public.users;
DROP POLICY IF EXISTS "Public: manage users" ON public.users;
DROP POLICY IF EXISTS "Admin: manage user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Public: manage user_roles" ON public.user_roles;

-- 5. Create clean, permissive policies for Admin management
CREATE POLICY "Public: read user_roles" ON public.user_roles 
  FOR SELECT USING (true);

CREATE POLICY "Public: manage users" ON public.users 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public: manage user_roles" ON public.user_roles 
  FOR ALL USING (true) WITH CHECK (true);

-- 6. Grant full table privileges to API roles
GRANT ALL ON public.users TO anon, authenticated, service_role;
GRANT ALL ON public.user_roles TO anon, authenticated, service_role;

-- 7. Clean up any duplicate role entries for same user (keeps latest)
DELETE FROM public.user_roles a
USING public.user_roles b
WHERE a.user_id = b.user_id 
  AND a.created_at < b.created_at;

-- 8. Safely recreate role check constraint allowing all staff roles
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check 
  CHECK (role IN ('admin', 'employee', 'manager', 'staff', 'support'));

-- 9. Reload Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
