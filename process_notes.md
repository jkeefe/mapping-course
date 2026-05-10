# Mapping & Protomaps Course — Process Notes

## 2026-05-09 — Project scaffolded

Built from scratch based on the plan documented in `~/Documents/Claude Projects/random/mapping-protomaps.md`.

**Goal:** Self-hosted video course site — 19 Vimeo videos across 4 weeks, first video of each week free, rest unlocked for $20 one-time payment.

**Stack chosen:** SvelteKit + Vercel (same as location-saver and smart-split) + Turso + Stripe + Resend.

**Access model:** Magic link. User pays via Stripe Checkout → webhook fires → token stored in Turso → Resend emails magic link → user clicks link → cookie set → all videos unlock. No passwords.

**Video data source:** `mapping-protomaps.md` in the random folder — all 19 Vimeo URLs with hash tokens documented there.

**Files created:**
- `src/lib/videos.js` — all 19 video IDs and hashes, organized by week. Free videos: w1-v1, w2-v1, w3-v1, w4-v1.
- `src/lib/db.js` — Turso client
- `src/lib/stripe.js` — Stripe client
- `src/lib/email.js` — Resend magic link sender
- `src/routes/+layout.server.js` — checks `access_token` cookie against DB, passes `isPaid` to all pages
- `src/routes/+page.svelte` — main course page, video grid, lightbox player
- `src/routes/access/+page.svelte` — "already paid?" email form
- `src/routes/api/checkout/+server.js` — redirects to Stripe Checkout
- `src/routes/api/webhook/+server.js` — Stripe webhook handler (writes token, sends email)
- `src/routes/api/magic-link/+server.js` — POST email → send new link if found in DB
- `src/routes/api/verify/+server.js` — GET ?token= → set cookie → redirect home
- `scripts/migrate.js` — creates the `access` table in Turso

**GitHub repo:** https://github.com/jkeefe/mapping-course

**Build:** Confirmed clean build with `npm run build`. Fixed two issues:
1. `PUBLIC_APP_URL` → `APP_URL` (SvelteKit reserves `PUBLIC_` prefix for client-exposed vars; server-only env vars must not start with PUBLIC_)
2. `onerror="..."` string attributes aren't valid in Svelte 5 — must use arrow function expressions

**Video thumbnails:** Using vumbnail.com which provides Vimeo thumbnails by ID without API auth.

## 2026-05-10 — Local preview confirmed working

Ran dev server, opened in Chrome. Site looks correct: header with unlock CTA, free video badges, lock icons on paid videos, lightbox player working. W1V1 real title confirmed: "Hands-on Mapmaking for Journalism — Week 1 • Video 1 — Shapes & Data with Datawrapper" — placeholder titles in videos.js need updating.

Turso DB and Stripe wired up. Stopped before Resend (account not yet created).

Price will change from $20 → $29 before launch — Stripe price ID, env vars, and page copy all need updating when that happens.

## Next steps (not yet done)

1. **Create Turso DB:** `turso db create mapping-course` → copy URL + token into Vercel env vars
2. **Run migration:** `npm run migrate` (after setting .env)
3. **Create Stripe product:** $20 one-time payment → get price ID → add to env vars
4. **Set up Resend:** Get API key, verify sending domain
5. **Deploy to Vercel:** `vercel --prod` from the mapping-course dir
6. **Set Stripe webhook:** Point to `https://your-domain.vercel.app/api/webhook` → get webhook secret → add to Vercel env
7. **Set Vimeo embed restrictions:** Paid videos (15 of them) → restrict to course domain only
8. **End-to-end test:** Use Stripe test card `4242 4242 4242 4242` to verify full flow
9. **Add video titles:** The titles in `videos.js` are placeholder guesses — update them with real titles from the actual video content
