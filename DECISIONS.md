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

## 19. Move page: source of the fitness and trail facts
The Move page (`/[lang]/move/`) is new. Its facts come from three places, and
each has a different confidence level:

- **Fitness room hours (06:30–22:00), access (house guests and THE VIEW card
  holders) and the Technogym equipment** are taken from the live site's
  "Fitness & Relax" page. **[VERIFY]** Confirm the hours and the card-holder
  access rule with the spa desk; they predate the 2023 inclusions revision.
- **Personal training rates (CHF 80.– for a 60-minute session, CHF 650.– for
  ten)** are the live site's published prices. **[VERIFY]** These are the
  single most likely figure on the page to have moved. They live in
  `src/content/move/move.json` and are editable in Sveltia without a code
  change.
- **The Vita Parcours figures (1.6 km, 15 stations, on Via Guidino)** are the
  Città di Lugano's published specification for the Paradiso parcours, which
  the property's own page already cites. Trail times and altitudes (San
  Salvatore 912 m and about two hours on foot, Sentiero degli Ulivi just over
  three kilometres and about an hour, Monte Brè 925 m) are the Lugano Region
  and Switzerland Tourism figures, deliberately rounded and hedged ("about",
  "just over") rather than stated as measurements of our own.

## 20. Move page: naming
The page is "Move" in English, "Bewegung" / "Movimento" / "Mouvement"
elsewhere. The homepage's five-day grid already carried a "Move" card
(`homepage.json` → `days.items[move]`), which until now pointed at the spa
page for want of anywhere better; it now points here. "Fitness" was rejected
as the section name: it describes the room and excludes the hillside, which is
the larger half of what the page is about.

## 21. Move page photography
Six photographs were pulled from the property's media library into
`src/assets/images/move/` as local originals (the direction DECISIONS §2 sets
for the whole site): the hillside meadow behind the house, the fitness room,
a Technogym detail, the wooded trail, and an outdoor training session on the
parcours, and the lake-view pool. The page references nothing from the CDN
manifest, so it is already where §2 wants the rest of the site to end up.
**[VERIFY]** The fitness-room and outdoor-training photographs are from the
2018 shoot and show dated sportswear. If a newer shoot exists, replacing the
files in place is the only change needed — the filenames carry the meaning.

## 22. Move page: the drag-to-reveal panel
The centre of the page is a comparison wipe — one photograph of the pool, one
of the trail, a hairline divider the guest drags between them. It is adapted
from the React Bits Pro "Comparison 7" block, the same way `SkewedCarousel`
adapts that library's carousel: the interaction is taken, the implementation
is not. Installing the block as published would have added React, Tailwind,
Motion and lucide-react to a site whose central performance decision is that
it ships no framework at all (§14). `CompareWipe.astro` is plain CSS and about
eighty lines of vanilla script on the site's own tokens.

Three deliberate departures from the reference:
- it is not before/after. Neither side is the improved one, so the divider
  rests at 50% and both panes are styled identically.
- the copy is anchored to the outer edges (indoors bottom-left, outdoors
  top-right) rather than centred in each pane, so a label is never wiped away
  until its side genuinely is, and the offset reads as the site's asymmetry.
- the handle carries the gallery lightbox's chevrons rather than an icon from
  a library, since nothing else on this site is iconographic.

The divider's position is a single registered custom property (`@property
--cw-pos`, a `<percentage>`). Registration is what lets it ease: unregistered,
a transition over `calc(100% - var(--cw-pos))` inside `clip-path` has no
reliable interpolation. Where `@property` is unsupported the divider still
moves, it just steps instead of gliding. Without JavaScript at all the panel
renders at rest with both halves readable; only the handle and the drag hint
are withheld.

## 23. Move page: the 17-metre pool
**[VERIFY]** The pool length is as stated by the property. It is attributed
here to the indoor pool, which is the one shown in the photograph and the one
the spa page already describes as having the lake behind the glass. Confirm
that the 17 m refers to the indoor pool and not the outdoor one before launch;
it appears in the wipe as a display figure, in the meta description, and in
the Indoors copy.

## 24. Move page: route figures and their sources
The six routes carry published figures, each checked against a tourist-board
or operator source rather than a blog:
- **Vita Parcours** 1.6 km, 15 stations — Città di Lugano, as §19.
- **Monte San Salvatore** 912 m; about 2 h up via Pazzallo, 1 h 15 and 632 m
  down on the Lugano Region descent route; funicular 10 min from Paradiso.
- **Sentiero dell'Olivo** 1 h 10, "Easy", 121 m of ascent (Lugano Region);
  olive cultivation documented on this shore from 769 AD, and the eighteen
  interpretive panels, per Switzerland Tourism and the City of Lugano. The
  headline figure for this row is the date rather than an altitude, because
  the walk is level and an altitude would say nothing about it.
- **Monte Boglia** 1,516 m; the "mountain that dominates" round from Brè,
  4 h 15, 870 m of ascent, graded difficult (Lugano Region).
- **Denti della Vecchia** high point 1,478 m; circuit from Villa Luganese
  13.2 km, 5 h 10, 951 m of ascent, T3.
- **Monte Generoso** 1,704 m; nevère circuit 4.3 km, 1 h 45, "Easy"; rack
  railway from 1890, summit building by Mario Botta, eleven drystone nevère;
  the railway runs mid-March to early November.

**[VERIFY] Denti della Vecchia.** The Outdooractive/Ticino listing for this
circuit was flagged "currently closed (inaccessible area)" when the figures
were gathered. The route's line on the page says outright that sections close
and to ask first, and the closing note has the Ambassador checking what is
open. Confirm the current status before launch.

Monte Brè was researched and left off deliberately: its summit height is given
as 915 m, 925 m and 933 m by three sources including two official ones, and a
disputed number has no business being set at 4.6rem. Distances in km were also
left off the Olive Trail, both San Salvatore routes and both Boglia routes,
because the official pages leave that field blank.

Everything above is in `src/content/move/move.json` and editable in Sveltia
without a code change.
