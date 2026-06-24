-- ============================================================
--  ADD USERS SCRIPT (ADMIN & STAFF)
--  Instructions: 
--  1. To create an Admin, copy and run ONLY the "ADD NEW ADMIN" block.
--  2. To create a Staff, copy and run ONLY the "ADD NEW STAFF" block.
--  3. Modify the variable values (email, password, name) inside the block before running.
-- ============================================================


-- ============================================================
--                       ADD NEW ADMIN
--  (Copy from the "DO $$" below down to the first "END $$;")
-- ============================================================
DO $$
DECLARE
  -- ==========================================
  -- ADMIN VARIABLES (CHANGE THESE)
  -- ==========================================
  new_admin_email VARCHAR := 'admin_new@myshop.com';
  new_admin_password VARCHAR := 'AdminPass123!';
  new_admin_first_name VARCHAR := 'Super';
  new_admin_last_name VARCHAR := 'Admin';
  new_admin_mobile VARCHAR := '+8801700000001';
  
  -- Internal Variables (Do not change)
  admin_id UUID := gen_random_uuid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = new_admin_email) THEN
    -- 1. Insert into auth.users
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
      recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', admin_id, 'authenticated', 'authenticated', 
      LOWER(new_admin_email), crypt(new_admin_password, gen_salt('bf')), now(), 
      now(), now(), '{"provider":"email","providers":["email"]}', 
      json_build_object('full_name', new_admin_first_name || ' ' || new_admin_last_name, 'phone', new_admin_mobile)::jsonb,
      now(), now(), '', '', '', ''
    );

    -- 2. Insert into auth.identities
    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), admin_id, admin_id::text, 
      format('{"sub":"%s","email":"%s"}', admin_id::text, LOWER(new_admin_email))::jsonb, 
      'email', now(), now(), now()
    );

    -- 3. Insert into public.users
    INSERT INTO public.users (
      id, first_name, last_name, email, mobile, status
    ) VALUES (
      admin_id, new_admin_first_name, new_admin_last_name, LOWER(new_admin_email), new_admin_mobile, 'active'
    );

    -- 4. Insert into public.user_roles (Role: admin)
    INSERT INTO public.user_roles (user_id, role, is_active)
    VALUES (admin_id, 'admin', true);
    
    RAISE NOTICE 'New Admin created successfully: %', new_admin_email;
  ELSE
    RAISE NOTICE 'Admin with email % already exists. Skipping...', new_admin_email;
  END IF;
END $$;



-- ============================================================
--                       ADD NEW STAFF
--  (Copy from the "DO $$" below down to the second "END $$;")
-- ============================================================
DO $$
DECLARE
  -- ==========================================
  -- STAFF VARIABLES (CHANGE THESE)
  -- ==========================================
  new_staff_email VARCHAR := 'staff_new@myshop.com';
  new_staff_password VARCHAR := 'StaffPass123!';
  new_staff_first_name VARCHAR := 'Demo';
  new_staff_last_name VARCHAR := 'Staff';
  new_staff_mobile VARCHAR := '+8801900000002';
  
  -- Internal Variables (Do not change)
  staff_id UUID := gen_random_uuid();
  staff_dept_id INTEGER;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = new_staff_email) THEN
    -- Get a department id (default to Management or id 1)
    SELECT id INTO staff_dept_id FROM public.departments ORDER BY id LIMIT 1;
    
    -- 1. Insert into auth.users
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
      recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', staff_id, 'authenticated', 'authenticated', 
      LOWER(new_staff_email), crypt(new_staff_password, gen_salt('bf')), now(), 
      now(), now(), '{"provider":"email","providers":["email"]}', 
      json_build_object('full_name', new_staff_first_name || ' ' || new_staff_last_name, 'phone', new_staff_mobile)::jsonb,
      now(), now(), '', '', '', ''
    );

    -- 2. Insert into auth.identities
    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), staff_id, staff_id::text, 
      format('{"sub":"%s","email":"%s"}', staff_id::text, LOWER(new_staff_email))::jsonb, 
      'email', now(), now(), now()
    );

    -- 3. Insert into public.users
    INSERT INTO public.users (
      id, first_name, last_name, email, mobile, department_id, status
    ) VALUES (
      staff_id, new_staff_first_name, new_staff_last_name, LOWER(new_staff_email), new_staff_mobile, COALESCE(staff_dept_id, 1), 'active'
    );

    -- 4. Insert into public.user_roles (Role: staff)
    INSERT INTO public.user_roles (user_id, role, is_active)
    VALUES (staff_id, 'staff', true);
    
    RAISE NOTICE 'New Staff created successfully: %', new_staff_email;
  ELSE
    RAISE NOTICE 'Staff with email % already exists. Skipping...', new_staff_email;
  END IF;
END $$;
