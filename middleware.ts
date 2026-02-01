import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is an admin route
    if (pathname.startsWith('/admin')) {
        // Exclude the login page from the check to avoid infinite loop
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for auth_token cookie
        const token = request.cookies.get('auth_token');

        if (!token || token.value !== 'tamborsan_admin_authenticated') {
            // Redirect to login page if not authenticated
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*'],
};
