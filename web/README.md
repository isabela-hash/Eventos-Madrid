This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Ticketing Data Setup

Eventos Madrid uses Airtable as the editable source of truth and keeps provider credentials server-side.

Required Airtable tables:

- `Venues`: `name`, `slug`, `type`, `address`, `neighborhood`, `description`, `landing_copy`, `photo_urls`, `hero_video_url`, `provider`, `provider_organization_id`, `provider_location_id`, `provider_venue_id`, `active`.
- `Events`: `name`, `slug`, `category`, `subcategory`, `venue_id`, `venue_name`, `neighborhood`, `date_start`, `time_start`, `price_from`, `currency`, `description`, `short_description`, `poster_url`, `provider`, `provider_event_id`, `provider_venue_id`, `provider_organization_id`, `provider_status`, `month`, `status`, `raw_provider_payload`, `last_synced_at`.
- `Ticket Offers`: `event_id`, `provider`, `provider_offer_id`, `provider_price_id`, `name`, `description`, `price`, `currency`, `available`, `available_quantity`, `min_quantity`, `max_quantity`, `includes`, `checkout_url`, `status`, `raw_provider_payload`.

Provider ownership:

- Fourvenues: Sala de Despecho, Casa Pepa, Perreo Lab, Club Magno, Babylon, Houdinni, Todos Santos, Gunilla, Calle 365, Salvaje.
- Xceed: Panthera, Istar, Victoria, Los Amantes.

Environment variables are listed in `.env.example`. Without Airtable or provider keys, the app falls back to local mock data so pages remain visible.

Sync and checkout routes:

- `GET /api/events?date=YYYY-MM-DD`
- `GET /api/venues/[slug]/events?month=YYYY-MM`
- `POST /api/checkout/fourvenues`
- `POST /api/sync/events?secret=SYNC_SECRET`
- `POST /api/webhooks/fourvenues`
- `POST /api/webhooks/xceed`

For Vercel Cron, set `CRON_SECRET` or `SYNC_SECRET`; `vercel.json` schedules `/api/sync/events` daily. The sync pulls the next 60 days from Fourvenues by mapped venue and upserts `Events` plus `Ticket Offers`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
