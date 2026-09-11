import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, first_name, last_name, email, mobile, password, role_id, department_id, status, photo_url, permissions } = body;

    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseKey) {
      return NextResponse.json({ success: false, error: 'Supabase credentials missing' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey
    );

    const userEmail = email ? email.toLowerCase().trim() : '';
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let targetId = isUuid ? id : null;
    let userExistsInPublic = false;

    // 1. Find existing user by ID or Email in public.users
    if (targetId) {
      const { data: foundById } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('id', targetId)
        .maybeSingle();

      if (foundById?.id) {
        userExistsInPublic = true;
      }
    }

    if (!userExistsInPublic && userEmail) {
      const { data: foundByEmail } = await supabaseAdmin
        .from('users')
        .select('id')
        .ilike('email', userEmail)
        .maybeSingle();

      if (foundByEmail?.id) {
        targetId = foundByEmail.id;
        userExistsInPublic = true;
      }
    }

    // 2. Update auth.users if service role key is available and targetId is valid auth user
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && targetId && isUuid) {
      try {
        const updateData = {
          email: userEmail,
          user_metadata: {
            full_name: `${first_name} ${last_name}`.trim(),
            phone: mobile
          }
        };
        
        if (password && password.trim() !== '') {
          updateData.password = password;
        }

        await supabaseAdmin.auth.admin.updateUserById(targetId, updateData);
      } catch (authErr) {
        console.warn('Auth user update warning (non-fatal):', authErr);
      }
    }

    // 3. Prepare payload for public.users
    const updatePayload = {
      first_name,
      last_name,
      email: userEmail,
      mobile: mobile || `017${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: status || 'active'
    };

    if (permissions !== undefined) {
      updatePayload.permissions = permissions;
    }

    let profileError = null;

    if (userExistsInPublic && targetId) {
      // Update existing record
      const { error: err } = await supabaseAdmin
        .from('users')
        .update({
          ...updatePayload,
          department_id: department_id ? parseInt(department_id) : 1,
          photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
        })
        .eq('id', targetId);

      profileError = err;

      if (profileError) {
        const retryResult = await supabaseAdmin
          .from('users')
          .update(updatePayload)
          .eq('id', targetId);
        profileError = retryResult.error;
      }
    } else {
      // Insert new record
      const insertPayload = { ...updatePayload };
      if (targetId) insertPayload.id = targetId;

      const { error: err, data: inserted } = await supabaseAdmin
        .from('users')
        .insert([{
          ...insertPayload,
          department_id: department_id ? parseInt(department_id) : 1,
          photo_url: photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
        }])
        .select('id')
        .maybeSingle();

      profileError = err;

      if (profileError) {
        // If FK violation on provided id, try inserting without explicit id
        delete insertPayload.id;
        const retryResult = await supabaseAdmin
          .from('users')
          .insert([insertPayload])
          .select('id')
          .maybeSingle();

        profileError = retryResult.error;
        if (retryResult.data?.id) {
          targetId = retryResult.data.id;
        }
      } else if (inserted?.id) {
        targetId = inserted.id;
      }
    }

    if (profileError) {
      console.error('Profile operation failed:', profileError.message);
      return NextResponse.json({ 
        success: false, 
        error: `Database update failed: ${profileError.message}` 
      }, { status: 400 });
    }

    // 4. Update public.user_roles safely
    const validRoles = ['admin', 'manager', 'staff', 'employee', 'support'];
    const safeRole = validRoles.includes(role_id) ? role_id : 'staff';

    if (targetId) {
      try {
        await supabaseAdmin
          .from('user_roles')
          .delete()
          .eq('user_id', targetId);

        await supabaseAdmin
          .from('user_roles')
          .insert([{
            user_id: targetId,
            role: safeRole,
            is_active: true
          }]);
      } catch (roleErr) {
        console.warn('User roles update warning:', roleErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id: targetId,
        first_name,
        last_name,
        email: userEmail,
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
