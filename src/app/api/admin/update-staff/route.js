import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, first_name, last_name, email, mobile, password, role_id, department_id, status, photo_url } = body;

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: 'SUPABASE_SERVICE_ROLE_KEY is missing in your .env.local file. Please add it and restart the server.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Update the user in auth.users
    const updateData = {
      email: email,
      user_metadata: {
        full_name: `${first_name} ${last_name}`,
        phone: mobile
      }
    };
    
    if (password && password.trim() !== '') {
      updateData.password = password;
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      id,
      updateData
    );

    if (authError) {
      console.error('Auth Update Error:', authError);
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }

    // 2. Update public.users
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .update({
        first_name,
        last_name,
        email: email.toLowerCase(),
        mobile,
        department_id: parseInt(department_id),
        status: status || 'active',
        photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
      })
      .eq('id', id);

    if (profileError) {
      return NextResponse.json({ success: false, error: profileError.message }, { status: 400 });
    }

    // 3. Update public.user_roles
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .update({ role: role_id })
      .eq('user_id', id);

    if (roleError) {
      return NextResponse.json({ success: false, error: roleError.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id,
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
