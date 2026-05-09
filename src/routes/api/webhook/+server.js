import { json, error } from '@sveltejs/kit';
import { stripe } from '$lib/stripe.js';
import { createClient } from '$lib/db.js';
import { sendMagicLink } from '$lib/email.js';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { randomBytes } from 'crypto';

export async function POST({ request }) {
  const rawBody = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failure:', err.message);
    throw error(400, 'Invalid signature');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email || session.customer_details?.email;

    if (!email) {
      console.error('No email on checkout session', session.id);
      return json({ received: true });
    }

    const token = randomBytes(32).toString('hex');
    const db = createClient();

    try {
      // Upsert — if they pay again, just update the token
      await db.execute({
        sql: `INSERT INTO access (email, token, stripe_session_id)
              VALUES (?, ?, ?)
              ON CONFLICT(email) DO UPDATE SET token = excluded.token, stripe_session_id = excluded.stripe_session_id`,
        args: [email, token, session.id]
      });
    } catch (err) {
      console.error('DB insert failed:', err);
      throw error(500, 'DB error');
    }

    try {
      await sendMagicLink(email, token);
    } catch (err) {
      console.error('Email send failed:', err);
      // Don't return an error — token is in DB, user can request a new link
    }
  }

  return json({ received: true });
}
