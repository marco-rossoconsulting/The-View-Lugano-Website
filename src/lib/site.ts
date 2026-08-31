// Single source of truth for property facts. Every guest-facing fact on the
// site renders from here, server-side, in plain HTML — never JS-only.
// Sources: theviewlugano.com audit (Aug 2026), Brand Bible 2026, CI 2015.

export const SITE = {
  name: 'THE VIEW Lugano',
  legalName: 'THE VIEW Lugano',
  group: 'Planhotel Hospitality Group',
  groupUrl: 'https://www.planhotel.com/',
  groupFounded: 1997,
  url: 'https://www.theviewlugano.com',
  tagline: {
    en: 'A world of its own',
    de: 'Eine Welt für sich',
    it: 'Un mondo a sé',
    fr: 'Un monde à part',
  } as Record<string, string>,
  address: {
    street: 'Via Guidino 29',
    postalCode: '6900',
    locality: 'Lugano – Paradiso',
    region: 'Ticino',
    country: 'CH',
    countryName: 'Switzerland',
  },
  geo: { lat: 45.9868066, lng: 8.9506256 },
  phone: '+41 91 210 0000',
  phoneHref: '+41912100000',
  whatsapp: '+41786300320',
  email: 'info@theviewlugano.com',
  vat: 'CHE-352.530.324',
  facebook: 'https://www.facebook.com/theviewlugano/',
  suites: {
    total: 18,
    juniorSuites: 16,
    juniorSuiteSqm: 50,
    superiorSuites: 2,
    superiorSuiteSqm: 105,
  },
  spa: {
    sqm: 1000,
    hours: '09:00–20:30',
    opens: '09:00',
    closes: '20:30',
    treatmentHours: '10:00–19:00',
    treatmentOpens: '10:00',
    treatmentCloses: '19:00',
  },
  restaurant: {
    name: 'THE VIEW Fine Dining',
    chef: 'Diego Della Schiava',
    michelinStarSince: 2022,
    gaultMillau: 16,
  },
  terrace: { name: 'Terrazza TreCinqueZero' },
  bar: { name: 'The Lounge Bar' },
  // GDS codes belong on the trade/B2B contact point only (Brand Bible §10.3).
  gds: {
    sabre: 'LX 284341',
    worldspan: 'LX LUGTV',
    galileo: 'LX B6318',
    amadeus: 'LX LUGTVL',
  },
  integrations: {
    simpleBookingBase: 'https://www.simplebooking.it/ibe2/hotel/10185',
    theForkWidget:
      'https://widget.thefork.com/8383ce3c-0a38-4964-919a-981fe0c93cb4/homepage/bf0e1c64-9595-450d-a032-64f581bbc9b8',
    theForkFineDining:
      'https://widget.thefork.com/en/8383ce3c-0a38-4964-919a-981fe0c93cb4?utm_source=6a8ea2ad4d9378da9f244bbc--theview-lugano.netlify.app&step=date',
    theForkBistrot:
      'https://widget.thefork.com/en/c3d07f7d-74f8-4ebf-84ab-704cd3e887f9/homepage/cca06037-40b6-4c31-a8ad-46adaf42b31b?utm_source=6a8ea2ad4d9378da9f244bbc--theview-lugano.netlify.app',
    fineDiningMenu:
      'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/456/2018/07/04192924/MENU-UFFICIALE-MARZO-26-pdf-2.pdf',
    bistrotMenu:
      'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/456/2018/07/10132226/MENU-BISTROT-FOOD-settembre-25-1-copia.pdf',
    loungeBarMenu:
      'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/456/2018/07/14112151/TVL_LOUNGE-BAR-PDF_p.pdf',
    egumaVouchers: 'https://shop.e-guma.ch/theviewlugano/{lang}/gift-vouchers',
    egumaEvents: 'https://shop.e-guma.ch/theviewlugano/{lang}/events',
    egumaSpaVouchers: 'https://shop.e-guma.ch/theviewlugano/{lang}/gift-vouchers/c/the-view-spa-2219114',
    spaBooking: 'https://www.secure-booker.com/viewlugano/MakeAppointment/Search.aspx',
  },
  awards: [
    { id: 'michelin-star', name: '1 Michelin Star — THE VIEW Fine Dining' },
    { id: 'michelin-key', name: 'Michelin Key' },
    { id: 'forbes', name: 'Forbes Travel Guide Four-Star' },
    { id: 'slh', name: 'Small Luxury Hotels of the World' },
    { id: 'design-hotel', name: "Switzerland's Leading Design Hotel" },
    { id: 'serandipians', name: 'Serandipians Hotel Partner' },
    { id: 'gault-millau', name: '16 Points Gault & Millau' },
    { id: 'travelife', name: 'Travelife Gold' },
    { id: 'swisstainable', name: 'Swisstainable Level III' },
    { id: 'okgo', name: 'OK:GO Accessibility Information' },
  ],
} as const;

export function egumaUrl(kind: 'vouchers' | 'events' | 'spaVouchers', lang: string): string {
  const map: Record<string, string> = { en: 'en', de: 'de', it: 'it', fr: 'fr' };
  const base =
    kind === 'vouchers'
      ? SITE.integrations.egumaVouchers
      : kind === 'spaVouchers'
        ? SITE.integrations.egumaSpaVouchers
        : SITE.integrations.egumaEvents;
  return base.replace('{lang}', map[lang] ?? 'en');
}

export function simpleBookingUrl(lang: string): string {
  const l = (lang ?? 'en').toUpperCase();
  return `${SITE.integrations.simpleBookingBase}?lang=${l}&cur=CHF`;
}
