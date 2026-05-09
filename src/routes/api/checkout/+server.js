import { redirect } from '@sveltejs/kit';
import { stripe } from '$lib/stripe.js';
import { STRIPE_PRICE_ID, APP_URL } from '$env/static/private';

export async function GET({ url }) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1
      }
    ],
    customer_email: url.searchParams.get('email') || undefined,
    success_url: `${APP_URL}/?checkout=success`,
    cancel_url: `${APP_URL}/`,
    metadata: {
      product: 'mapping-course'
    }
  });

  throw redirect(303, session.url);
}
