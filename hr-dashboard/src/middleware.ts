import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedRoutes = ['/dashboard', '/employees', '/candidates', '/leaves', '/attendance'];

  if (request.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/candidates', request.url));
  }


  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/employees/:path*', '/candidates/:path*', '/leaves/:path*', '/attendance/:path*'],
};
