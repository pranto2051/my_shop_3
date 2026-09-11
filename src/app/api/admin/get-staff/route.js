import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseKey) {
      return NextResponse.json({ success: false, error: 'Supabase credentials missing' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey,
      {
        auth: { persistSession: false },
        global: { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } }
      }
    );

    // 1. Fetch all users from public.users
    const { data: usersData, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (userError) {
      console.error('Error fetching users from database:', userError.message);
      return NextResponse.json({ success: false, error: userError.message }, { status: 400 });
    }

    // 2. Fetch all user roles from public.user_roles
    const { data: rolesData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('*');

    if (roleError) {
      console.warn('Warning fetching user roles:', roleError.message);
    }

    return NextResponse.json({
      success: true,
      data: usersData || [],
      roles: rolesData || [],
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (err) {
    console.error('Server error in get-staff route:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
