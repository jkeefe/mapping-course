# mapping-course — Setup Checklist

## Where we are

The full SvelteKit project is scaffolded, builds clean, and is pushed to GitHub:
https://github.com/jkeefe/mapping-course

The code is complete end-to-end. What's left is wiring up the external services and deploying.

---

## To do

### 1. Turso (database)
- [ ] `turso db create mapping-course`
- [ ] `turso db tokens create mapping-course`
- [ ] Copy the DB URL and token into `.env`
- [ ] Run `npm run migrate` to create the `access` table

### 2. Stripe
- [ ] Create a new product: "Mapping & Protomaps Course" — $20, one-time payment
- [ ] Copy the **Price ID** (looks like `price_...`) into `.env` as `STRIPE_PRICE_ID`
- [ ] Copy the **Secret Key** into `.env` as `STRIPE_SECRET_KEY`

### 3. Resend (email)
- [ ] Get a Resend API key → `.env` as `RESEND_API_KEY`
- [ ] Verify a sending domain (or use `onboarding@resend.dev` for testing)
- [ ] Set that address as `RESEND_FROM` in `.env`

### 4. Deploy to Vercel
- [ ] `cd mapping-course && vercel --prod`
- [ ] Note the deployed URL (e.g. `mapping-course.vercel.app`)
- [ ] Set all env vars in Vercel dashboard:
  - `APP_URL` — your deployed URL (no trailing slash)
  - `TURSO_URL`
  - `TURSO_AUTH_TOKEN`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRICE_ID`
  - `RESEND_API_KEY`
  - `RESEND_FROM`
  - `STRIPE_WEBHOOK_SECRET` (do this after step 5)

### 5. Stripe webhook
- [ ] In Stripe dashboard → Webhooks → Add endpoint
- [ ] URL: `https://your-domain.vercel.app/api/webhook`
- [ ] Event: `checkout.session.completed`
- [ ] Copy the **Signing Secret** (`whsec_...`) → Vercel env var `STRIPE_WEBHOOK_SECRET`
- [ ] Redeploy Vercel so it picks up the new env var

### 6. Vimeo embed restrictions
- [ ] For each of the 15 **paid** videos, go to Vimeo → Privacy → "Where can this be embedded?"
- [ ] Set to "Specific domains" → add your course domain
- [ ] Free videos (w1-v1, w2-v1, w3-v1, w4-v1) can stay unrestricted
- [ ] The 15 paid video IDs are: 1148818116, 1148818622, 1148819222, 1148819919, 1148823111, 1148824159, 1148824970, 1148826747, 1148827866, 1148829097, 1148830588, 1148836958, 1148838036, 1148838591, 1148840105

### 7. Real video titles
- [ ] Update the placeholder titles in `src/lib/videos.js` with the actual video titles
- [ ] Commit + push + redeploy

### 8. End-to-end test
- [ ] Visit the site — confirm 4 free videos play, 15 show lock icon
- [ ] Click "Unlock All Videos" → Stripe test card `4242 4242 4242 4242`, any future date, any CVC
- [ ] Check email arrives with magic link
- [ ] Click link → cookie set → all 15 paid videos now play
- [ ] Visit `/access`, enter same email → confirm new link arrives

### 9. Custom domain (optional)
- [ ] Point a domain at the Vercel deployment
- [ ] Update `APP_URL` env var and Vimeo embed restrictions to match

---

## Key files to know

| File | What it does |
|------|-------------|
| `src/lib/videos.js` | All 19 video IDs, hashes, titles, free/paid status |
| `src/lib/email.js` | Magic link email via Resend |
| `src/routes/+layout.server.js` | Checks access cookie, passes `isPaid` to all pages |
| `src/routes/+page.svelte` | Main course page — video grid + lightbox |
| `src/routes/access/+page.svelte` | "Already paid?" email form |
| `src/routes/api/checkout/+server.js` | Redirects to Stripe Checkout |
| `src/routes/api/webhook/+server.js` | Stripe webhook → writes token, sends email |
| `src/routes/api/magic-link/+server.js` | POST email → sends new link |
| `src/routes/api/verify/+server.js` | Validates token → sets cookie → redirects home |
| `scripts/migrate.js` | Creates `access` table in Turso |
