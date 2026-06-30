import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * OAuth Callback Route Handler
 *
 * Supabase redirects here after Google OAuth.
 * We exchange the `code` for a session and then redirect to /dashboard.
 * On failure we redirect to /signin with a descriptive error param.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // OAuth provider returned an error (e.g. user denied access)
  if (error) {
    const params = new URLSearchParams({
      error: errorDescription ?? error,
    });
    return NextResponse.redirect(`${origin}/signin?${params.toString()}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/signin?error=Missing+OAuth+code`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if middleware is refreshing sessions.
          }
        },
      },
    }
  );

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    const params = new URLSearchParams({ error: exchangeError.message });
    return NextResponse.redirect(`${origin}/signin?${params.toString()}`);
  }

  // Successful — send user to the dashboard
  return NextResponse.redirect(`${origin}/dashboard`);
}
