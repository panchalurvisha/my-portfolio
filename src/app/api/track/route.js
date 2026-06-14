import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { deviceId, os, browser } = await request.json();
    const now = new Date();

    const data = {
      os:      os      ?? 'Unknown',
      browser: browser ?? 'Unknown',
    };

    const col = (await clientPromise).db('portfolio').collection('visitors');

    if (deviceId) {
      await col.updateOne(
        { deviceId },
        {
          $set:         { ...data, deviceId, lastSeenAt: now },
          $setOnInsert: { firstSeenAt: now },
          $inc:         { visitCount: 1 },
        },
        { upsert: true }
      );
    } else {
      // No deviceId (localStorage blocked) — plain insert, no dedup
      await col.insertOne({ ...data, firstSeenAt: now, lastSeenAt: now, visitCount: 1 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[tracker]', err.message);
    return Response.json({ ok: false }, { status: 500 });
  }
}
