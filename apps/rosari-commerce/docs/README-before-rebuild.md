# Rosari Commerce OS

> Commerce OS for UMKM — dashboard, catalogue, orders, CRM, finance, storefront & WAHA in one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-Private-lightgrey?style=flat-square)

![Hero](docs/hero.png)

## Demo

![Demo GIF](docs/demo.gif)

[View Full Demo Video](public/screenshots/page.webm) — 1280x720 VP9, click to watch the full walkthrough. Also available at `public/screenshots/page.webm`.

Live URLs after deploy:
- Custom domain: https://rosari-commerce.zwart.my.id
- Vercel: https://rosari-commerce.vercel.app
- GitHub: https://github.com/Zwart04/rosari-commerce

## Features

### Dashboard — Real-time KPIs
Revenue, orders, and growth at a glance with Recharts analytics. Bilingual EN/ID, period filters, and live stats.

<img src="docs/dashboard.png" width="650" alt="Dashboard" />

### Products — Catalogue & Inventory
Catalogue with variants, stock tracking, pricing, bulk import, and search. Full CRUD with local persistence.

<img src="docs/products.png" width="650" alt="Products" />

### Orders — End-to-End Lifecycle
Order management from checkout to fulfillment, status pipeline, and returns. Filter, sort, and update statuses.

<img src="docs/orders.png" width="650" alt="Orders" />

### Customers — CRM & Segmentation
Customer CRM with segmentation, purchase history, and WhatsApp outreach via WAHA deep-link templates.

<img src="docs/customers.png" width="650" alt="Customers" />

### Finance — Auto-Journal & Reports
Income, expenses, profit and loss with auto-journal from orders. Exportable CSV and Recharts breakdowns.

<img src="docs/finance.png" width="650" alt="Finance" />

### Storefront — Public Shareable Page
Hosted storefront per tenant at `/storefront/[slug]` with custom domain support. Public, SEO-friendly, shareable.

<img src="docs/hero.png" width="650" alt="Storefront Hero" />

### WAHA — WhatsApp Automation
WhatsApp HTTP API integration for automated commerce messaging, template deep-links, and order notifications.

### Bilingual EN/ID — Full UI Toggle
Complete EN/ID dictionary (STRINGS) with localStorage-persisted toggle on every page.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | Tailwind CSS v4, lucide-react, Geist font |
| Auth | NextAuth 5 (Hugging Face OAuth) + hf_user cheap auth |
| Charts | Recharts |
| State | React Context (DataContext, I18nContext) |
| Crypto | bcryptjs, jsonwebtoken, uuid |
| Dates | date-fns |
| Video | VP9 WebM via ffmpeg (Lanczos) |

## Project Structure

```
rosari-commerce/
├── docs/
│   ├── hero.png            # 800x450 hero banner
│   ├── dashboard.png       # 800x450 feature shot
│   ├── products.png
│   ├── orders.png
│   ├── customers.png
│   ├── finance.png
│   └── demo.gif            # 650px wide, 6+ frames
├── public/
│   └── screenshots/
│       └── page.webm       # 1280x720 VP9 demo video
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 + hsl(var(--token)) dark theme
│   │   ├── layout.tsx
│   │   ├── page.tsx        # auth + tab router (bilingual, hf_user)
│   │   ├── (auth)/login/
│   │   ├── (dashboard)/    # dashboard, products, orders, customers, finance, storefront, waha, settings
│   │   └── storefront/[slug]/
│   ├── components/
│   ├── contexts/           # DataContext, I18nContext
│   └── lib/                # auth, db, i18n, waha
├── .npmrc
└── package.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build:

```bash
npm run build
npm start
```

## Demo Account

Use the cheap `hf_user` auth on the landing page:

- **Email:** `admin@rosari.id`
- **Password:** `password123`

Credentials are checked client-side and stored as `hf_user` in localStorage. NextAuth Hugging Face OAuth is also configured for production via `HF_CLIENT_ID` / `HF_CLIENT_SECRET`.

## Environment Variables

```
NEXTAUTH_SECRET=...
HF_CLIENT_ID=...
HF_CLIENT_SECRET=...
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_GOOGLE_ADS_ID=...
```

## Roadmap

- [ ] Multi-tenant billing and subscriptions
- [ ] Marketplace integrations (Tokopedia, Shopee, TikTok Shop)
- [ ] Advanced WAHA flows (catalog broadcasts, abandoned cart)
- [ ] Native mobile app (React Native)
- [ ] AI product copy and pricing suggestions
- [ ] Offline-first PWA for low-connectivity stores

## License

Private — all rights reserved.
