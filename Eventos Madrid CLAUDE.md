# CLAUDE.md
You are a senior UI designer and frontend developer with backend knowledge for solid event discovery platforms.

## Project

**Eventos Madrid** — Madrid's premium events & nightlife directory (`eventosmadrid.com`).

A curated discovery platform for concerts, theatre, nightlife, sports, and cultural events in Madrid. The platform bridges discovery and booking: Browse Events → Filter by Category/Date/Venue → Direct Ticket Links → Newsletter for exclusive deals. Voice: sophisticated, local, trustworthy — the insider's guide to Madrid nights.

## Always Do First
- Invoke the superpowers to analyze better step by step. Also invoke `frontend-design` skill before writing any frontend code, every session, no exceptions, view /mnt/skills/public/frontend-design/SKILL.md

## Brand Identity

### Name & Concept
**Eventos Madrid** — The premium events directory for Madrid, Spain.
Tagline options: “All of Madrid. One place.”

---

### Color System — "Noche Madrileña"

**Concept:** Madrid at night. The amber glow of Gran Vía streetlamps against warm limestone. The Cibeles fountain gold. Rioja garnet. Cobblestone charcoal. No neon. No gradients that look like a disco ball. Everything feels like a velvet rope.

```css
/* === BACKGROUNDS (layered depth system) === */
--color-base:        #0B0B0F;   /* Madrid night sky — near black, barely warm  */
--color-surface:     #13131A;   /* Card / panel surface                        */
--color-elevated:    #1C1C26;   /* Dropdown / modal / floating                 */
--color-border:      #2A2A36;   /* Subtle dividers                             */

/* === BRAND GOLD — Cibeles Gold === */
--color-gold:        #C4973F;   /* Primary brand gold — warm, NOT brassy       */
--color-gold-dim:    #8A6830;   /* Subdued gold for secondary elements         */
--color-champagne:   #E8D5A3;   /* Parchment/ivory — large display text tint   */

/* === ACCENT — Rioja Garnet (use sparingly: badges, live indicators) === */
--color-garnet:      #7D1F35;   /* Deep wine red — flamenco, Spanish culture   */
--color-garnet-soft: #A83252;   /* Hover/lighter garnet variant                */

/* === SECONDARY ACCENT — Retiro Teal (use even more sparingly: 1 element/screen) === */
--color-teal:        #2A5F6B;   /* Retiro lake reflection — unexpected, premium */
--color-teal-soft:   #3D8A99;   /* Hover variant                               */

/* === TYPOGRAPHY COLORS === */
--color-text-primary:   #F2EDE4;   /* Warm ivory — headings & high-emphasis   */
--color-text-secondary: #B8B3A8;   /* Warm stone — body copy                  */
--color-text-muted:     #6E6A62;   /* Subdued — metadata, dates, captions      */
--color-text-inverse:   #0B0B0F;   /* For use on gold/light backgrounds        */
```

**Usage rules:**
- `--color-gold` is the ONLY call-to-action color. One CTA per view.
- `--color-garnet` only on: "Live now", "Hot", "Sold out" badges — never as a button color.
- `--color-teal` maximum once per screen. Think of it as a punctuation mark.
- Backgrounds must always use the layered system: base → surface → elevated. Never flat.
- Text on dark backgrounds: always `--color-text-primary` or `--color-text-secondary`. Never pure `#FFFFFF`.

**Never use:**
- Neon of any kind (no `#00FF`, no `#FF00`, no electric purples)
- Default Tailwind palette (indigo-500, blue-600, etc.)
- Pure black `#000000` or pure white `#FFFFFF` — always the warm brand variants

---

### Typography

| Role         | Font                            | Weight   | Notes                                      |
|--------------|---------------------------------|----------|--------------------------------------------|
| Display/Hero | `Playfair Display` (serif)      | 700–900  | Tight tracking `-0.03em`, used for impact  |
| Headings     | `Playfair Display` or `Cormorant Garamond` | 600 | Elegant, European editorial feel  |
| Body         | `Inter` or `DM Sans` (sans)     | 400–500  | Clean, readable, modern                    |
| Metadata     | `DM Mono` (mono)                | 400      | Dates, prices, ticket counts               |
| Accent       | Italic variant of display font  | 400i     | For taglines and pull-quotes               |

**Load via Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400&family=Inter:wght@400;500;600&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
```

---

### Visual Language
- **Imagery:** Event posters and venue photos always get a `gradient-to-t from-[#0B0B0F]/80` overlay + a subtle warm color treatment layer with `mix-blend-multiply` using `--color-gold-dim` at low opacity.
- **Cards:** Slightly rounded `border-radius: 8px`, surface background, gold `1px border` on hover only, layered shadow: `0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(196,151,63,0.08)`.
- **Texture:** Apply a subtle SVG noise grain filter on hero sections for depth. Never flat color fills for backgrounds.
- **Dividers:** Use `--color-border` lines sparingly. Prefer whitespace over lines.
- **Icons:** Line-style only. Use Lucide icons. Never filled/solid icons.

---

## Reference Sites (for design inspiration — adapt, don't copy)
- **Entradas.com / Madrid city listing** — Event list layout, card structure, filter UX, horizontal featured scrollers
- **Fourvenues.com** — Dark theme execution, premium nightlife aesthetic, dashboard data components
- **TheLuxuryList NYC** — Typography elegance, editorial feel, warm dark backgrounds, serif/sans pairing

---

## Always Do First
- Invoke the superpowers to analyze better step by step.
- Invoke `frontend-design` skill before writing any frontend code, every session, no exceptions: `view /mnt/skills/public/frontend-design/SKILL.md`

---

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

---

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

---

## Screenshot Workflow
- Puppeteer is installed in `node_modules/puppeteer/`. Chrome cache is at `~/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

---

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

---

## Brand Assets
- Always check the `brand_assets/` folder before designing. It contains logos, design system, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette, typography, animations is defined, use those exact values — do not invent brand colors.

---

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette. Always use the Eventos Madrid brand tokens defined above.
- **Shadows:** Never flat `shadow-md`. Use layered, color-tinted shadows with low opacity — always tinted with `--color-gold` at `0.06–0.10` opacity.
- **Typography:** Playfair Display for display/headings, Inter for body. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body. Never use the same weight for heading and body.
- **Gradients:** Layer multiple radial gradients. Use `--color-gold` and `--color-garnet` as radial hotspots at very low opacity (3–6%) to add warmth. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions. Gold border or gold glow on hover for cards.
- **Images:** Always overlay with `bg-gradient-to-t from-[#0B0B0F]/80`. Add warm treatment layer using `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces must use the layered system (base → surface → elevated → floating). Nothing sits flat.

---

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not use neon colors of any kind
- Do not use pure `#000000` or `#FFFFFF`

---

## Stack

| Layer       | Tool                              |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Styling     | Tailwind CSS + shadcn/ui          |
| Data / CMS  | Airtable API                      |
| AI          | Claude API (Anthropic)            |
| Forms       | Tally                             |
| Automation  | Make.com                          |
| Email       | Klaviyo                           |
| Payments    | Stripe                            |
|                         |

---

## Commands

```bash
npm run dev       # start dev server at localhost:3000
npm run build     # verify build — run after every change
npm run lint      # lint
```

---

## Workflow (Non-Negotiable)

1. Always work on the `dev` branch. Never push directly to `main`.
2. Start every new feature in **Plan Mode** — read existing files first, propose approach, wait for approval before writing code.
3. Run `npm run build` after every change to verify. Fix errors before moving on.

---

## Code Style

- TypeScript strict mode, ES modules throughout
- Components → `/src/components`
- Pages / routes → `/src/app`
- Use shadcn/ui components wherever possible — do not install other UI libraries
- **Never hardcode event or venue data.** All event/venue information comes from Airtable via API.

---

## SEO (Required on Every Page)

Every page must include:
- `<title>` meta tag
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`)
- Clean URL structure: `/eventos/[slug]`, `/venues/[slug]`, `/categoria/[category]`, `/blog/[slug]`
- JSON-LD structured data on event detail and venue pages (`Event` and `LocalBusiness` schema types)
- `hreflang` tags for ES and EN versions

---

## Key Pages & Routes

| Route                          | Purpose                                                                        |
|--------------------------------|--------------------------------------------------------------------------------|
| `/`                            | Homepage: hero, featured events carousel, category grid, tonight's picks, newsletter CTA |
| `/eventos`                     | Full event grid with filters: category, date range, price, venue, neighborhood |
| `/eventos/[slug]`              | Individual event detail page (static, from Airtable)                           |
| `/venues/[slug]`               | Venue profile: location, upcoming events, photos, info                         |
| `/categoria/[category]`        | Category landing: Conciertos, Teatro, Nightlife, Deportes, Arte, Festivales    |
| `/tonight`                     | Dynamic "What to do tonight in Madrid" page — auto-filtered by today's date    |
| `/blog/[slug]`                 | Editorial content: guides, roundups, "Best of Madrid" articles (MDX)           |
| `/newsletter`                  | Newsletter signup with lead magnet (free Madrid events guide)                  |

---

## Airtable Schema Reference

**Events table fields (do not hardcode — fetch from Airtable):**
`name`, `slug`, `category`, `subcategory`, `venue_id`, `date_start`, `date_end`, `time_start`, `price_from`, `price_to`, `currency`, `description`, `short_description`, `poster_url`, `ticket_url`, `affiliate_link`, `is_featured`, `is_tonight`, `tags`, `status`, `recurrence`, `stars_rating`, `review_snippet`, `neighborhood`, `last_verified_date`

**Venues table fields:**
`name`, `slug`, `type`, `address`, `neighborhood`, `google_maps_url`, `capacity`, `description`, `photo_urls`, `website_url`, `instagram_url`, `phone`, `opening_hours`, `metro_station`, `affiliated`

**Leads / Newsletter table:**
`email`, `name`, `signup_source`, `signup_date`, `preferences`, `klaviyo_id`, `status`

---

## Newsletter Automation Flow

Tally signup → Make.com webhook → Klaviyo (welcome email with Madrid Events Guide PDF) → Airtable CRM (log lead with source and preferences)


---

## Localization

- Default language: **Spanish (ES)** — all UI copy in Spanish
- Secondary language: **English (EN)** — toggle in nav
- Date format: `lun. 21 abr. 2026, 21:30` (Spanish locale)
- Currency: `€` — always with comma decimals (`15,00 €`)
- `next-intl` for i18n routing

---

## Component Naming Conventions (Brand-specific)

| Component          | Description                                                           |
|--------------------|-----------------------------------------------------------------------|
| `EventCard`        | Dark surface card with poster, date badge, price, category tag        |
| `FeaturedCarousel` | Horizontal scroll of highlighted events with large poster imagery     |
| `CategoryGrid`     | Icon + label grid for event categories (Conciertos, Teatro, etc.)     |
| `VenueCard`        | Venue profile card with photo, type badge, metro info                 |
| `FilterBar`        | Sticky filter strip: category pills, date picker, price range slider  |
| `EventHero`        | Full-bleed poster banner for individual event pages                   |
| `TicketCTA`        | Gold CTA button linking to ticket affiliate URL                       |
| `NewsletterBanner` | Email capture strip with Madrid-themed copy                           |
| `TonightStrip`     | Urgency bar: "Esta noche en Madrid — X eventos disponibles"           |
