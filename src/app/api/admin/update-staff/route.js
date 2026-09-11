import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, first_name, last_name, email, mobile, password, role_id, department_id, status, photo_url } = body;

    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseKey) {
      return NextResponse.json({ success: false, error: 'Supabase credentials missing' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey
    );

    // 1. Update auth.users if service role key is available
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const updateData = {
          email: email,
          user_metadata: {
            full_name: `${first_name} ${last_name}`.trim(),
            phone: mobile
          }
        };
        
        if (password && password.trim() !== '') {
          updateData.password = password;
        }

        await supabaseAdmin.auth.admin.updateUserById(id, updateData);
      } catch (authErr) {
        console.warn('Auth user update warning (non-fatal):', authErr);
      }
    }

    // 2. Update public.users
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .update({
        first_name,
        last_name,
        email: email ? email.toLowerCase() : undefined,
        mobile,
        department_id: department_id ? parseInt(department_id) : 1,
        status: status || 'active',
        photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
      })
      .eq('id', id);

    if (profileError) {
      console.warn('Profile update error:', profileError.message);
    }

    // 3. Update public.user_roles safely (delete old role entries to prevent duplicate key constraint errors)
    const validRoles = ['admin', 'manager', 'staff', 'employee', 'support'];
    const safeRole = validRoles.includes(role_id) ? role_id : 'staff';

    try {
      await supabaseAdmin
        .from('user_roles')
        .delete()
        .eq('user_id', id);

      await supabaseAdmin
        .from('user_roles')
        .insert([{
          user_id: id,
          role: safeRole,
          is_active: true
        }]);
    } catch (roleErr) {
      console.warn('User roles update warning:', roleErr);
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id,
        first_name,
        last_name,
        email: email ? email.toLowerCase() : '',
        mobile,
        status: status || 'active',
        role_id: safeRole
      }
    });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
