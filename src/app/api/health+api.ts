import { sql } from '@/server/db';

export async function GET() {
  try {
    await sql`SELECT 1`;
    return Response.json({ status: 'ok' });
  } catch (error) {
    console.error('Database health check failed', error);
    return Response.json({ status: 'error' }, { status: 503 });
  }
}
