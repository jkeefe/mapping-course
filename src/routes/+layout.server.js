import { createClient } from '$lib/db.js';

export async function load({ cookies }) {
  const token = cookies.get('access_token');
  if (!token) return { isPaid: false };

  try {
    const db = createClient();
    const result = await db.execute({
      sql: 'SELECT email FROM access WHERE token = ?',
      args: [token]
    });
    if (result.rows.length > 0) {
      return { isPaid: true, email: result.rows[0].email };
    }
  } catch (e) {
    console.error('DB check error:', e);
  }

  return { isPaid: false };
}
