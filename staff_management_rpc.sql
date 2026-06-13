-- ============================================================
-- SQL FUNCTIONS FOR STAFF MANAGEMENT
-- These functions allow admins to create and update staff users
-- including their authentication records, without needing a
-- service role key on the client.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to create a new staff user
CREATE OR REPLACE FUNCTION public.create_staff_user(
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email VARCHAR,
  p_mobile VARCHAR,
  p_password VARCHAR,
  p_role_id VARCHAR,
  p_department_id INTEGER,
  p_status VARCHAR,
  p_photo_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  result JSONB;
BEGIN
  -- 1. Check if the executing user is an admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can create staff users.';
  END IF;

  -- 2. Check if the user already exists in auth.users
  SELECT id INTO new_user_id FROM auth.users WHERE email = p_email LIMIT 1;
  
  IF new_user_id IS NOT NULL THEN
    RAISE EXCEPTION 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট খোলা আছে। দয়া করে অন্য ইমেইল ব্যবহার করুন। (Email already exists)';
  END IF;

  -- 3. Generate a new UUID
  new_user_id := gen_random_uuid();

  -- 4. Insert into auth.users
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
    LOWER(p_email), crypt(COALESCE(NULLIF(p_password, ''), '123456'), gen_salt('bf')), now(), 
    now(), now(), '{"provider":"email","providers":["email"]}', 
    json_build_object('full_name', p_first_name || ' ' || p_last_name, 'phone', p_mobile)::jsonb,
    now(), now(),
    '', '', '', ''
  );

  -- 5. Insert into auth.identities
  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), new_user_id, new_user_id::text, 
    format('{"sub":"%s","email":"%s"}', new_user_id::text, LOWER(p_email))::jsonb, 
    'email', now(), now(), now()
  );

  -- 6. Insert into public.users
  INSERT INTO public.users (
    id, first_name, last_name, email, mobile, department_id, photo_url, status
  ) VALUES (
    new_user_id, p_first_name, p_last_name, LOWER(p_email), p_mobile, p_department_id, p_photo_url, p_status
  );

  -- 7. Insert into public.user_roles
  INSERT INTO public.user_roles (
    user_id, role, is_active
  ) VALUES (
    new_user_id, p_role_id, true
  );

  -- Return the created user's public info (include role_id for frontend)
  SELECT row_to_json(u) INTO result 
  FROM (
    SELECT 
      users.*, 
      p_role_id as role_id 
    FROM public.users 
    WHERE id = new_user_id
  ) u;

  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to create user: %', SQLERRM;
END;
$$;

-- Function to update an existing staff user
CREATE OR REPLACE FUNCTION public.update_staff_user(
  p_user_id UUID,
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email VARCHAR,
  p_mobile VARCHAR,
  p_password VARCHAR,
  p_role_id VARCHAR,
  p_department_id INTEGER,
  p_status VARCHAR,
  p_photo_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- 1. Check if the executing user is an admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can update staff users.';
  END IF;

  -- 2. Update auth.users if email or password changed
  IF p_password IS NOT NULL AND p_password != '' THEN
    UPDATE auth.users 
    SET 
      email = LOWER(p_email),
      encrypted_password = crypt(COALESCE(NULLIF(p_password, ''), '123456'), gen_salt('bf')),
      raw_user_meta_data = jsonb_set(
                             jsonb_set(raw_user_meta_data, '{full_name}', to_jsonb(p_first_name || ' ' || p_last_name)),
                             '{phone}', to_jsonb(p_mobile)
                           ),
      updated_at = now()
    WHERE id = p_user_id;
  ELSE
    UPDATE auth.users 
    SET 
      email = LOWER(p_email),
      raw_user_meta_data = jsonb_set(
                             jsonb_set(raw_user_meta_data, '{full_name}', to_jsonb(p_first_name || ' ' || p_last_name)),
                             '{phone}', to_jsonb(p_mobile)
                           ),
      updated_at = now()
    WHERE id = p_user_id;
  END IF;

  -- 3. Update public.users
  UPDATE public.users
  SET 
    first_name = p_first_name,
    last_name = p_last_name,
    email = LOWER(p_email),
    mobile = p_mobile,
    department_id = p_department_id,
    photo_url = p_photo_url,
    status = p_status,
    updated_at = now()
  WHERE id = p_user_id;

  -- 4. Update public.user_roles
  UPDATE public.user_roles
  SET role = p_role_id
  WHERE user_id = p_user_id;

  -- Return the updated user's public info (include role_id for frontend)
  SELECT row_to_json(u) INTO result 
  FROM (
    SELECT 
      users.*, 
      p_role_id as role_id 
    FROM public.users 
    WHERE id = p_user_id
  ) u;

  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to update user: %', SQLERRM;
END;
$$;

-- Ensure execute permissions
GRANT EXECUTE ON FUNCTION public.create_staff_user(VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, INTEGER, VARCHAR, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_staff_user(UUID, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, INTEGER, VARCHAR, TEXT) TO authenticated;
