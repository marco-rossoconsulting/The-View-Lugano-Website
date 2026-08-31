import { SITE, simpleBookingUrl } from './site';
import type { Locale } from './i18n';

const LD_LANG: Record<Locale, string> = { en: 'en', de: 'de', it: 'it', fr: 'fr' };

/** Hotel/LodgingBusiness with nested Restaurant.
 *  "Five-star" belongs in structured data and fact sheets, not in brand copy
 *  (Brand Bible §10.3) — hence starRating here and nowhere in visible prose. */
export function hotelJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${SITE.url}/#hotel`,
    name: SITE.name,
    brand: SITE.group,
    url: `${SITE.url}/${lang}/`,
    inLanguage: LD_LANG[lang],
    slogan: SITE.tagline[lang],
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$$$',
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: simpleBookingUrl(lang),
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
    },
    numberOfRooms: SITE.suites.total,
    checkinTime: '15:00',
    checkoutTime: '11:00',
    starRating: { '@type': 'Rating', ratingValue: '5' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    image: 'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/456/2018/07/12135345/hotel_012.jpg',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Lake view from every suite', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Indoor pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Outdoor pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Spa (1,000 m²)', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fitness room', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Complimentary electric Smart cars and e-bikes', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    ],
    award: SITE.awards.map((a) => a.name),
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
    ],
    containsPlace: {
      '@type': 'Restaurant',
      '@id': `${SITE.url}/#restaurant`,
      name: SITE.restaurant.name,
      servesCuisine: 'Mediterranean',
      award: `1 Michelin Star (since ${SITE.restaurant.michelinStarSince}); ${SITE.restaurant.gaultMillau} points Gault & Millau`,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.locality,
        addressCountry: SITE.address.country,
      },
    },
    sameAs: [SITE.facebook, 'https://slh.com/hotels/the-view-lugano', 'https://www.forbestravelguide.com/hotels/lugano-switzerland/the-view-lugano'],
  };
}

export function localBusinessJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE.url}/#localBusiness`,
    name: SITE.name,
    url: `${SITE.url}/${lang}/`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
    ],
    image: 'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/456/2018/07/12135345/hotel_012.jpg',
  };
}

export function howToArriveJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lang === 'en' ? 'How to arrive at THE VIEW Lugano' : lang === 'de' ? 'Anreise zum THE VIEW Lugano' : lang === 'it' ? 'Come arrivare al THE VIEW Lugano' : 'Comment arriver au THE VIEW Lugano',
    step: [
      {
        '@type': 'HowToStep',
        name: lang === 'en' ? 'By car' : 'Mit dem Auto',
        text: 'Leave the A2 at Lugano Sud, follow Paradiso, then Via Guidino to number 29. Parking is available at the house.',
      },
      {
        '@type': 'HowToStep',
        name: lang === 'en' ? 'By train' : 'Mit dem Zug',
        text: 'Lugano station is ten minutes away; Paradiso station closer still. Collection can be arranged with your Ambassador.',
      },
      {
        '@type': 'HowToStep',
        name: lang === 'en' ? 'By air' : 'Mit dem Flugzeug',
        text: 'Lugano Airport is around 25 minutes, Milan Malpensa around an hour, Zurich around two and a half by road or rail.',
      },
    ],
  };
}

export function spaJsonLd(lang: Locale, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    '@id': `${SITE.url}/#spa`,
    name: `${SITE.name} Spa`,
    url: `${SITE.url}/${lang}/spa/`,
    inLanguage: LD_LANG[lang],
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$$$',
    image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    containedInPlace: { '@id': `${SITE.url}/#hotel` },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: SITE.spa.opens,
        closes: SITE.spa.closes,
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Indoor pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Night Spa', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Sauna & steam bath', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Himalayan salt relaxation room', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fitness studio', value: true },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function imageJsonLd(images: { url: string; caption: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: images.map((im, i) => ({
      '@type': 'ImageObject',
      position: i + 1,
      contentUrl: im.url,
      caption: im.caption,
      creditText: 'THE VIEW Lugano',
    })),
  };
}
