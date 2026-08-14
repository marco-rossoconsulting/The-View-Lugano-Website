# DECISIONS.md — THE VIEW Lugano website rebuild

Every assumption and judgment call in this build, logged. Items marked
**[VERIFY]** need confirmation from the property or a vendor before launch.

## 1. Colour: CMYK → screen adaptation
The 2015 CI defines the palette in CMYK (print). Screen values were converted
and then adjusted by eye so the relationships between tones survive on
backlit displays:

| CI name | CMYK | Screen token | Hex |
|---|---|---|---|
| Marrone | 60/65/90/65 | `--ink` | `#33291A` |
| Grigio creta | 30/40/60/40 | `--clay` | `#8A7657` |
| Grigio medio | 30/25/25/0 | `--grigio` | `#B4B7B5` |
| Tortora denso | 17/15/22/0 | `--tortora-densa` | `#D9D5C8` |
| Tortora | 10/8/15/0 | `--tortora` | `#EAE7DC` |
| Tortora chiaro | 4/4/6/0 | `--ground` | `#F7F5F0` |
| Argento (foil) | — | `--argento` | `#C9CDCF` |

Argento — the CI's silver foil — is reserved exclusively for the waterline
signature element. It appears nowhere else.

## 2. Photography source and migration path
All imagery is real property photography, currently referenced from the
property's existing media CDN (`d1vp8nomjxwyf1.cloudfront.net`). This was
chosen so the build ships with the true photo library, zero stock.
**[VERIFY / ACTION]** That CDN is tied to the current WordPress install. Before
the WP site is decommissioned, download the originals into
`src/assets/photos/` and switch `src/lib/photos.ts` to local imports — the
`Pic` component and everything downstream is unchanged. astro:assets will
then optimize from local sources instead of remote ones.

## 3. Typography: licensed faces substituted
The CI specifies Futura TT (logo) and Gotham (text) — both commercially
licensed. The build ships open-licensed substitutes with matched roles:
**Jost** (geometric sans in Futura's lineage; weights 300/400) for display and
wordmark, **Montserrat** (400/500) for body. Self-hosted latin WOFF2 subsets
in `public/fonts/`, preloaded.
**[VERIFY]** If the property holds Futura TT / Gotham web licences, drop the
WOFF2 files in and change only the two `@font-face` blocks in
`src/styles/global.css`. Metrics are close; no layout rework expected.

## 4. Wordmark
The logo is reconstructed as inline SVG lettering (THE VIEW regular-weight,
LUGANO light, wide tracking) per the CI's lettering spec, rather than a
traced bitmap. Crisp at any size, themable via `currentColor`.
**[VERIFY]** Replace with the official vector logo file if available.

## 5. "Experiences & Offers" navigation label
The brief's IA names this section "Experiences & Offers"; the Brand Bible's
never-say list discourages "offer" as commodity language. Resolution: the EN
nav label keeps the brief's conventional wording ("Experiences & Offers")
because that is what guests scan for in a hotel menu, while all body copy
avoids the word — "arrangement" (EN/DE), "proposta" (IT), "proposition"
(FR) throughout. The other nav labels soften it natively: IT "Esperienze &
Proposte", FR "Expériences & Propositions", DE "Erlebnisse & Arrangements".
If the property wants the EN label changed too, it is one string in
src/i18n/en.json (nav.experiences).

## 6. Check-in / check-out times
15:00 / 11:00 are stated in the FAQ, terms and Hotel JSON-LD.
**[VERIFY]** Standard for the property per booking-platform listings, but
confirm with the front office before launch.

## 7. SimpleBooking deep-link parameters
Base URL, `?lang=` and `&cur=CHF` are taken from the live integration
(hotel 10185) and verified. The booking bar additionally passes `checkin`,
`checkout`, `guests`.
**[VERIFY]** Confirm these three parameter names with the SimpleBooking
account manager. If unsupported, the link still lands correctly on the
property's IBE with language and currency set — nothing breaks.

## 8. Parking, pets, breakfast, minibar
FAQ answers on parking (available at the house), pets (on request), children
(welcome) and the amenity line "minibar" reflect the guest-review analysis
and post-2023 inclusions direction rather than a published fact sheet.
**[VERIFY]** Confirm exact parking arrangements (valet? charge?), pet policy
terms, and minibar inclusion with the property.

## 9. Forbes rating
Displayed as "Forbes Travel Guide Four-Star" per the live site's 2026 badge.
The 2026 brand documents contain an internal reference to "Recommended".
**[VERIFY]** Confirm the current published Forbes designation; adjust one
string in `src/lib/site.ts`.

## 10. GDS placement
GDS codes (Amadeus/Sabre/Galileo/WorldSpan) appear only on the Contact
page's trade & advisor block — not in the footer — per Brand Bible §10.3
(trade information does not belong in guest-facing chrome). This is a
deliberate deviation from the current site.

## 11. "Five-star" register
The classification appears in exactly two machine/trade registers: the Hotel
JSON-LD `starRating` and the Press page fact sheet. It appears nowhere in
guest-facing brand copy, per Brand Bible §10.3.

## 12. Award presentation
Credentials render as a single quiet text strip (footer + press page), not a
logo wall. The full award set is carried in structured data (`award` array in
Hotel JSON-LD). If logo marks are wanted later, add SVGs under
`src/assets/awards/` and swap the list items — but the restrained treatment
is the design recommendation.

## 13. Legal pages drafted fresh
Privacy, Terms and Cookie policies are written to Swiss nLPD structure
(with GDPR reference for EU guests), naming the actual third-party
processors (SimpleBooking, TheFork, e-guma). The Impressum carries the
verified company data (VAT CHE-352.530.324).
**[ACTION]** Have counsel review before launch; these are working drafts,
not legal advice.

## 14. No client framework
The site ships zero JS framework. Interactivity (menu, booking bar, gallery
lightbox, consent, TheFork gate) is small vanilla script islands. This is
the main lever for the Lighthouse ≥95 / LCP <2.5s target on a
photography-heavy site.

## 15. TheFork embed is consent-gated
The widget iframe loads only after marketing consent or an explicit click
(FADP). Until then the phone line is offered — no path to a table is ever
dead-ended.

## 16. Residence data
The Residence entry (≈80 m², sleeps 4, 4 units) is an estimate; layouts
genuinely vary by apartment and the page says so.
**[VERIFY]** Replace with actual apartment specs.

## 17. Root URL behaviour
`/` serves a static meta-refresh + links to `/en/` (x-default). In
production, prefer an edge-level `Accept-Language` redirect at the host
(config example in README) — the static fallback remains for crawlers.

## 18. Sandbox build note
The verification build in this workspace ran with
`passthroughImageService()` and the CDN domain de-authorized, because the
build sandbox cannot reach the media CDN. The shipped `astro.config.mjs` is
the production one: sharp service, `image.domains` authorizing the CDN, so a
normal CI/host build generates the full AVIF/WebP responsive set.
