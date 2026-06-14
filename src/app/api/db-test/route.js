import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db('admin').command({ ping: 1 });
    return Response.json({ status: 'connected', message: 'MongoDB ping successful ✅' });
  } catch (error) {
    return Response.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
