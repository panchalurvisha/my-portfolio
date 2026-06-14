import { cookies } from 'next/headers';

export async function POST(request) {
  const { id, password } = await request.json();

  const validId = process.env.ADMIN_ID;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;

  if (id !== validId || password !== validPassword) {
    return Response.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set('admin_session', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return Response.json({ success: true });
}
