import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, mobile, password, role_id, department_id, status, photo_url } = body;

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is missing in .env.local');
      return NextResponse.json({ success: false, error: 'SUPABASE_SERVICE_ROLE_KEY is missing in your .env.local file. Please add it and restart the server.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Create the user in auth.users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password || '123456',
      email_confirm: true,
      user_metadata: {
        full_name: `${first_name} ${last_name}`,
        phone: mobile
      }
    });

    if (authError) {
      console.error('Auth Creation Error:', authError);
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2. Insert into public.users
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert([{
        id: userId,
        first_name,
        last_name,
        email: email.toLowerCase(),
        mobile,
        department_id: parseInt(department_id),
        status: status || 'active',
        photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
      }]);

    if (profileError) {
      // Cleanup auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({ success: false, error: profileError.message }, { status: 400 });
    }

    // 3. Insert into public.user_roles
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert([{
        user_id: userId,
        role: role_id,
        is_active: true
      }]);

    if (roleError) {
      return NextResponse.json({ success: false, error: roleError.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id: userId,
        first_name,
        last_name,
        email: email.toLowerCase(),
        mobile,
        department_id: parseInt(department_id),
        status: status || 'active',
        photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        role_id
      }
    });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
