import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    // Token will exist if the user is logged in
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.URL,
    });

    const { pathname } = req.nextUrl;

    // Allow the request if the following is true
    // 1. the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect if token does not exist and they are trying to request a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
}
