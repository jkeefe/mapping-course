import { redirect, error } from '@sveltejs/kit';
import { createClient } from '$lib/db.js';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function GET({ url, cookies }) {
  const token = url.searchParams.get('token');
  if (!token) throw error(400, 'Missing token');

  const db = createClient();
  const result = await db.execute({
    sql: 'SELECT email FROM access WHERE token = ?',
    args: [token]
  });

  if (result.rows.length === 0) {
    throw error(403, 'Invalid or expired token');
  }

  // Set access cookie
  cookies.set('access_token', token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE
  });

  throw redirect(303, '/?welcome=1');
}
