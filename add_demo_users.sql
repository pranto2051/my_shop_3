-- ============================================================
--  ADD DEMO USERS SCRIPT (ADMIN & STAFF)
--  Instructions: 
--  1. You can modify the email, password, and details below.
--  2. Run this script in your Supabase SQL Editor.
-- ============================================================

DO $$
DECLARE
  -- ==========================================
  -- VARIABLES FOR ADMIN
  -- ==========================================
  admin_id UUID := gen_random_uuid();
  admin_email VARCHAR := 'admin@myshop.com';
  admin_password VARCHAR := 'Admin123!';
  admin_first_name VARCHAR := 'Super';
  admin_last_name VARCHAR := 'Admin';
  admin_mobile VARCHAR := '+8801700000000';
  
  -- ==========================================
  -- VARIABLES FOR STAFF
  -- ==========================================
  staff_id UUID := gen_random_uuid();
  staff_email VARCHAR := 'staff@myshop.com';
  staff_password VARCHAR := 'Staff123!';
  staff_first_name VARCHAR := 'Demo';
  staff_last_name VARCHAR := 'Staff';
  staff_mobile VARCHAR := '+8801900000000';
  staff_dept_id INTEGER;

BEGIN
  -- ==========================================
  -- 1. CREATE DEMO ADMIN
  -- ==========================================
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
      recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', admin_id, 'authenticated', 'authenticated', 
      LOWER(admin_email), crypt(admin_password, gen_salt('bf')), now(), 
      now(), now(), '{"provider":"email","providers":["email"]}', 
      json_build_object('full_name', admin_first_name || ' ' || admin_last_name, 'phone', admin_mobile)::jsonb,
      now(), now(), '', '', '', ''
    );

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), admin_id, admin_id::text, 
      format('{"sub":"%s","email":"%s"}', admin_id::text, LOWER(admin_email))::jsonb, 
      'email', now(), now(), now()
    );

    -- Insert into public.users
    INSERT INTO public.users (
      id, first_name, last_name, email, mobile, status
    ) VALUES (
      admin_id, admin_first_name, admin_last_name, LOWER(admin_email), admin_mobile, 'active'
    );

    -- Insert into public.user_roles (Role: admin)
    INSERT INTO public.user_roles (user_id, role, is_active)
    VALUES (admin_id, 'admin', true);
    
    RAISE NOTICE 'Demo Admin created successfully: %', admin_email;
  ELSE
    RAISE NOTICE 'Admin with email % already exists. Skipping...', admin_email;
  END IF;


  -- ==========================================
  -- 2. CREATE DEMO STAFF
  -- ==========================================
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = staff_email) THEN
    -- Get a department id (default to Management or id 1)
    SELECT id INTO staff_dept_id FROM public.departments ORDER BY id LIMIT 1;
    
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
      recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', staff_id, 'authenticated', 'authenticated', 
      LOWER(staff_email), crypt(staff_password, gen_salt('bf')), now(), 
      now(), now(), '{"provider":"email","providers":["email"]}', 
      json_build_object('full_name', staff_first_name || ' ' || staff_last_name, 'phone', staff_mobile)::jsonb,
      now(), now(), '', '', '', ''
    );

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), staff_id, staff_id::text, 
      format('{"sub":"%s","email":"%s"}', staff_id::text, LOWER(staff_email))::jsonb, 
      'email', now(), now(), now()
    );

    -- Insert into public.users
    INSERT INTO public.users (
      id, first_name, last_name, email, mobile, department_id, status
    ) VALUES (
      staff_id, staff_first_name, staff_last_name, LOWER(staff_email), staff_mobile, COALESCE(staff_dept_id, 1), 'active'
    );

    -- Insert into public.user_roles (Role: staff)
    INSERT INTO public.user_roles (user_id, role, is_active)
    VALUES (staff_id, 'staff', true);
    
    RAISE NOTICE 'Demo Staff created successfully: %', staff_email;
  ELSE
    RAISE NOTICE 'Staff with email % already exists. Skipping...', staff_email;
  END IF;

END $$;
