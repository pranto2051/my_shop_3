import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: 'SUPABASE_SERVICE_ROLE_KEY is missing in your .env.local file. Please add it and restart the server.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // This will delete the user from auth.users. 
    // The ON DELETE CASCADE on public.users will automatically delete the profile.
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      console.error('Auth Deletion Error:', authError);
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
