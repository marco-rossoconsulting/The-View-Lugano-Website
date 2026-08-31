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
