import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const { username, password } = await req.json();
    const cookieStore = await cookies();

    if (username === 'admin' && password === 'admin123') {
        cookieStore.set('auth_token', 'tamborsan_admin_authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/',
        });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Hatalı giriş' }, { status: 401 });
}
