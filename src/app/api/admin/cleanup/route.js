import clientPromise from '@/lib/mongodb';
import { cookies } from 'next/headers';

// One-time DB cleanup — removes fields we no longer collect.
// Protected by admin session. Hit GET /api/admin/cleanup once, then you can delete this file.
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!session || session !== process.env.ADMIN_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const col = (await clientPromise).db('portfolio').collection('visitors');

    const { modifiedCount } = await col.updateMany(
      {},
      {
        $unset: {
          deviceType:     '',
          browserVersion: '',
          screenWidth:    '',
          screenHeight:   '',
          language:       '',
          timezone:       '',
          referrer:       '',
          page:           '',
          ip:             '',
          userAgent:      '',
          visitedAt:      '',
        },
      }
    );

    return Response.json({ ok: true, modifiedCount });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
