import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  // Skip middleware for non-admin routes or the login page itself
  if (!request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Get the session cookie
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
  
  // Check for auth cookie
  const authCookie = request.cookies.get('sb-auth-token')?.value;
  
  // If no auth cookie, redirect to login
  if (!authCookie) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure the middleware to run only on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};