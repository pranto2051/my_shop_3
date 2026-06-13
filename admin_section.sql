-- Admin Login Info
DO $$
DECLARE
  new_admin_id UUID := gen_random_uuid();
BEGIN

  -- 1. Create the user in auth.users (Supabase Authentication)
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_admin_id,
    'authenticated',
    'authenticated',
    'prantoislamnt51@gmail.com',
    crypt('pranto1234', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name": "Admin User", "phone": "01979728818"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  -- 2. Create the identity in auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,  -- Added provider_id
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    new_admin_id,
    new_admin_id::text,  -- For email provider, provider_id is the user's UUID
    format('{"sub":"%s","email":"%s"}', new_admin_id::text, 'prantoislamnt51@gmail.com')::jsonb,
    'email',
    now(),
    now(),
    now()
  );

  -- 3. Add the user to your public.users table
  INSERT INTO public.users (
    id,
    first_name,
    last_name,
    email,
    mobile,
    status
  ) VALUES (
    new_admin_id,
    'Admin',
    'User',
    'prantoislamnt51@gmail.com',
    '01979728818',
    'active'
  );

  -- 4. Assign the 'admin' role in public.user_roles
  INSERT INTO public.user_roles (
    user_id,
    role,
    is_active
  ) VALUES (
    new_admin_id,
    'admin',
    true
  );

END $$;



DO $$
DECLARE
  target_user_id UUID := 'a53ab6d6-014b-4fb0-b0c4-4a6b7005cc5c';
BEGIN

  -- 1. Check if user exists in auth.users and update password, otherwise insert it
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id OR email = 'prantoislamnt51@gmail.com') THEN
    UPDATE auth.users 
    SET 
      encrypted_password = crypt('pranto1234', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE id = target_user_id OR email = 'prantoislamnt51@gmail.com';
  ELSE
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
      last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', target_user_id, 'authenticated', 'authenticated', 
      'prantoislamnt51@gmail.com', crypt('pranto1234', gen_salt('bf')), now(), 
      now(), '{"provider":"email","providers":["email"]}', '{"full_name": "Admin User", "phone": "01979728818"}', now(), now()
    );
  END IF;

  -- 2. Make sure they have an identity in auth.identities
  IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = target_user_id) THEN
    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), target_user_id, target_user_id::text, 
      format('{"sub":"%s","email":"%s"}', target_user_id::text, 'prantoislamnt51@gmail.com')::jsonb, 
      'email', now(), now(), now()
    );
  END IF;

  -- 3. Make sure they have the admin role in public.user_roles
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = target_user_id) THEN
    INSERT INTO public.user_roles (user_id, role, is_active)
    VALUES (target_user_id, 'admin', true);
  END IF;

END $$;

