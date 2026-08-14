# THE VIEW Lugano — website

Full rebuild of www.theviewlugano.com. Astro 5, static output, four locales
(EN /en/, DE /de/, IT /it/, FR /fr/), no client framework, Sveltia CMS for
content editing. Read `DECISIONS.md` first — it logs every assumption and
the items still marked **[VERIFY]**.

## Commands

```bash
npm install        # once
npm run dev        # local dev at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve the built site locally
npm run check      # type-check (astro check)
```

Node 20+ required. The production build fetches and optimizes the property
photography from the media CDN (AVIF/WebP responsive sets), so the build
machine needs outbound network access.

## Where things live

```
src/lib/site.ts        ← single source of truth for property facts
                          (address, phone, suites, spa hours, GDS,
                          integration URLs, awards). Edit facts HERE.
src/lib/photos.ts      ← photography manifest with per-locale alt text
src/i18n/{en,de,it,fr}.json ← all interface & page copy, one file per locale
src/content/           ← CMS-editable collections (suites, dining, spa,
                          offers, journal), JSON, all four locales per entry
src/styles/global.css  ← design tokens (CI palette), waterline signature
src/components/        ← Pic (images), Hero, EditorialSplit, BookingBar,
                          ConsentBanner, TheForkWidget, Faq, Header, Footer
src/pages/[lang]/      ← one file per route, ×4 locales at build
public/admin/          ← Sveltia CMS (open /admin/ on the deployed site)
public/llms.txt        ← plain-language fact file for AI crawlers
DECISIONS.md           ← assumptions log — read before launch
```

## Editing content (non-developers)

1. Open `https://<your-domain>/admin/` and sign in (Git-based auth; the
   backend repo/branch is configured in `public/admin/config.yml` — set the
   real repository before first use).
2. Choose a collection (Suites, Dining, Spa, Offers, Journal), edit, save.
   Every save is a Git commit; the host rebuilds and deploys automatically.
3. Every text field requires all four languages, and every photo requires
   alt text in all four languages. The build fails on missing translations
   — this is intentional. Nothing half-translated can ship.

Interface copy (menus, FAQ, legal pages) lives in `src/i18n/*.json` and is
edited in the repository directly, not through the CMS.

## Changing photography

Photos are declared in `src/lib/photos.ts` (site-wide) and inside content
entries (suites/offers/journal). To migrate off the legacy CDN: place
originals in `src/assets/photos/`, import them in `photos.ts`, and keep the
alt-text objects — see DECISIONS §2. Only real property photography; no
stock. Alt text is mandatory.

## Deployment

Any static host (Netlify, Vercel, Cloudflare Pages). Build command
`npm run build`, output `dist/`.

Recommended host config:
- Redirect `/` → `/en/` (301) with `Accept-Language` negotiation at the
  edge if the host supports it; a static fallback page is already in place.
- Cache `/_astro/*` and `/fonts/*` immutable; HTML no-cache.
- The Sveltia backend in `public/admin/config.yml` needs the real repo name
  and an OAuth app on your Git host.

## Compliance & performance notes

- Cookie consent (Swiss FADP): granular, equal-weight, revocable via the
  footer. Third-party embeds (TheFork) load only after marketing consent
  or an explicit click.
- Legal pages are working drafts — counsel review before launch
  (DECISIONS §13).
- Performance budget: no framework JS, self-hosted subsetted fonts,
  responsive AVIF/WebP, explicit image dimensions, hero preload. Verify
  Lighthouse ≥95 mobile on the deployed host, not localhost.
