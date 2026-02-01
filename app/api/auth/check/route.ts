import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (token && token.value === 'tamborsan_admin_authenticated') {
        return new Response(JSON.stringify({ authenticated: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ authenticated: false }), { status: 200 });
}
