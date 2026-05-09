import { json, error } from '@sveltejs/kit';
import { createClient } from '$lib/db.js';
import { sendMagicLink } from '$lib/email.js';
import { randomBytes } from 'crypto';

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON');
  }

  const email = body?.email?.trim()?.toLowerCase();
  if (!email) throw error(400, 'Email required');

  const db = createClient();

  // Check if email has paid access
  const result = await db.execute({
    sql: 'SELECT id FROM access WHERE email = ?',
    args: [email]
  });

  if (result.rows.length === 0) {
    throw error(404, 'No purchase found for that email');
  }

  // Generate a fresh token and update DB
  const token = randomBytes(32).toString('hex');
  await db.execute({
    sql: 'UPDATE access SET token = ? WHERE email = ?',
    args: [token, email]
  });

  try {
    await sendMagicLink(email, token);
  } catch (err) {
    console.error('Email send failed:', err);
    throw error(500, 'Failed to send email');
  }

  return json({ ok: true });
}
