# TrueBites

Campaign platform for TrueBites — a Cuttack, Odisha-based Indian health food brand selling roasted makhanas and sattu drink.

## What this is

Cafe visitors scan a QR code on their table, land on a mobile campaign page, claim a free sattu drink, leave feedback, and walk away with 30% off makhanas. The operator manages everything from a private admin dashboard.

## Routes

| Route | Description |
|---|---|
| `/` | Brand home page |
| `/c/[cafeId]` | Campaign flow — 5-step mobile experience triggered by QR scan |
| `/admin` | Password-protected admin dashboard |

### Campaign flow (`/c/[cafeId]`)

1. **Landing** — Welcome screen with sattu drink offer
2. **Sign up** — Name + WhatsApp number (2 fields only)
3. **Redemption code** — Unique code to show cafe staff for the free drink
4. **Feedback** — Star rating, flavor preference, age group, health-consciousness, optional comments + email
5. **Thank you** — 30% off makhana discount code + one-tap WhatsApp order button

Each cafe partner gets a unique `cafeId` embedded in their QR code URL (e.g. `/c/brew-co`), enabling per-location analytics.

### Admin dashboard (`/admin`)

Password: `truebites2026` (change before going live)

- **Dashboard** — Total signups, feedback count, conversion rate, top cafe
- **Signups** — Searchable, filterable list with expandable rows; CSV export button
- **Feedback** — Average rating, top flavor, try-again rate; filter by cafe and rating; tap any row for full detail sheet
- **Cafes** — Add cafe partners, view per-cafe stats, download unique QR codes

## Tech stack

- [SvelteKit 2](https://kit.svelte.dev) + [Svelte 5](https://svelte.dev) (runes)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` — no `tailwind.config.js`, CSS-first config
- TypeScript

## Design system

All tokens live in `src/app.css` under `:root` (for direct `var(--tb-*)` use) and `@theme` (for Tailwind utility classes).

| Token group | Prefix |
|---|---|
| Colors | `--tb-terracotta`, `--tb-forest`, `--tb-turmeric`, `--tb-cream`, `--tb-ink`, … |
| Typography | `--tb-display` (Instrument Serif), `--tb-body` (Plus Jakarta Sans), `--tb-mono` (JetBrains Mono) |
| Radii | `--tb-r-sm/md/lg/xl/pill` |
| Shadows | `--tb-shadow-sm/md/lg/card` |

Component classes: `.tb-btn`, `.tb-btn-primary/accent/secondary/whatsapp`, `.tb-input`, `.tb-chip`, `.tb-badge`, `.tb-card`, `.tb-grain`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
npm run build    # production build
npm run preview  # preview production build
```

## Project structure

```
src/
├── app.css                          # design tokens + all component styles
├── app.html
├── lib/
│   ├── components/
│   │   ├── BigChoice.svelte         # yes / maybe / no large tap targets
│   │   ├── ChipGroup.svelte         # single + multi-select pill chips
│   │   ├── QRBlock.svelte           # deterministic QR code renderer
│   │   ├── StarRating.svelte        # interactive + read-only stars
│   │   ├── StepProgress.svelte      # step n of m bar
│   │   └── TBLogo.svelte            # wordmark with leaf mark
│   └── icons.ts                     # SVG icon strings
└── routes/
    ├── +layout.svelte
    ├── +page.svelte                 # brand home page
    ├── c/[cafeId]/+page.svelte      # campaign flow
    └── admin/+page.svelte           # admin dashboard
```

## Going live checklist

- [ ] Change admin password (currently hardcoded in `admin/+page.svelte`)
- [ ] Replace WhatsApp number `919876543210` with the real number across all pages
- [ ] Wire up a real backend (database for signups/feedback, unique code generation, CSV export)
- [ ] Update FSSAI number in the home page footer
- [ ] Add a real `favicon.png` to `static/`
- [ ] Configure a deploy adapter (`@sveltejs/adapter-node`, Vercel, Cloudflare, etc.)

---

Built by [Ayush Jhunjhunwala](mailto:ayushjhun13@gmail.com)
