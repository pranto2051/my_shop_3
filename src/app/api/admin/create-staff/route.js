import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, mobile, password, role_id, department_id, status, photo_url, permissions } = body;

    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseKey) {
      return NextResponse.json({ success: false, error: 'Supabase credentials missing' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey
    );

    const validRoles = ['admin', 'manager', 'staff', 'employee', 'support'];
    const safeRole = validRoles.includes(role_id) ? role_id : 'staff';
    let userId = `usr-${Date.now()}`;

    // 1. If service role key is available, create user in auth.users
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: password || '123456',
          email_confirm: true,
          user_metadata: {
            full_name: `${first_name} ${last_name}`.trim(),
            phone: mobile
          }
        });

        if (!authError && authData?.user) {
          userId = authData.user.id;
        }
      } catch (authErr) {
        console.warn('Auth user creation warning (continuing with database insert):', authErr);
      }
    }

    // 2. Insert into public.users
    const basePayload = {
      id: userId,
      first_name,
      last_name,
      email: email ? email.toLowerCase() : '',
      mobile: mobile || `017${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: status || 'active'
    };

    if (permissions) {
      basePayload.permissions = permissions;
    }

    let { error: profileError } = await supabaseAdmin
      .from('users')
      .insert([{
        ...basePayload,
        department_id: department_id ? parseInt(department_id) : 1,
        photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
      }]);

    if (profileError) {
      console.warn('Initial profile insert warning, retrying without optional schema columns:', profileError.message);
      
      const retryResult = await supabaseAdmin
        .from('users')
        .insert([basePayload]);

      profileError = retryResult.error;

      if (profileError && basePayload.permissions) {
        delete basePayload.permissions;
        const coreResult = await supabaseAdmin
          .from('users')
          .insert([basePayload]);
        profileError = coreResult.error;
      }
    }

    if (profileError) {
      console.error('Profile insert failed:', profileError.message);
      return NextResponse.json({ 
        success: false, 
        error: `Database insert failed: ${profileError.message}` 
      }, { status: 400 });
    }

    // 3. Insert into public.user_roles
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert([{
        user_id: userId,
        role: safeRole,
        is_active: true
      }]);

    if (roleError) {
      console.warn('Role insert warning:', roleError.message);
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id: userId,
        first_name,
        last_name,
        email: email ? email.toLowerCase() : '',
        mobile,
        status: status || 'active',
        role_id: safeRole,
        permissions
      }
    });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
