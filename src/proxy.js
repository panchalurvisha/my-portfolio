import { NextResponse } from 'next/server';

export function proxy(request) {
  const session = request.cookies.get('admin_session')?.value;
  const secret = process.env.ADMIN_SECRET;

  const { pathname } = request.nextUrl;

  // Protect all /admin/dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    if (!session || session !== secret) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // If already logged in, redirect away from login page
  if (pathname === '/admin') {
    if (session && session === secret) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
};
