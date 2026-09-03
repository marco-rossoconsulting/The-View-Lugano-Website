import en from '../i18n/en.json';
import de from '../i18n/de.json';
import it from '../i18n/it.json';
import fr from '../i18n/fr.json';

export const LOCALES = ['en', 'de', 'it', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

const dictionaries: Record<Locale, typeof en> = { en, de, it, fr };

export function isLocale(x: string | undefined): x is Locale {
  return !!x && (LOCALES as readonly string[]).includes(x);
}

/** Full dictionary for a locale. */
export function dict(lang: Locale) {
  return dictionaries[lang];
}

/** Static paths helper: one path per locale. */
export function localePaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

/** Build a localized path: p('en', 'suites') -> /en/suites/ */
export function p(lang: Locale, ...segments: string[]): string {
  const tail = segments.filter(Boolean).join('/');
  return tail ? `/${lang}/${tail}/` : `/${lang}/`;
}

/** hreflang alternates for a route (same path across locales). */
export function alternates(pathAfterLang: string) {
  const clean = pathAfterLang.replace(/^\/+|\/+$/g, '');
  return LOCALES.map((l) => ({
    hreflang: l,
    href: clean ? `/${l}/${clean}/` : `/${l}/`,
  }));
}

/** Swiss regional locales. de-CH and it-CH write decimals with a point,
 *  fr-CH with a comma — so a figure like 1.6 km is not the same string in
 *  every language on the site. */
const NUMBER_LOCALE: Record<Locale, string> = {
  en: 'en-GB',
  de: 'de-CH',
  it: 'it-CH',
  fr: 'fr-CH',
};

/** Format a figure for display. Accepts the raw strings that come out of the
 *  CMS: anything that is not a plain number is passed through untouched. */
export function formatFigure(value: string | number, lang: Locale): string {
  const n = typeof value === 'number' ? value : Number(String(value).trim());
  if (!Number.isFinite(n) || String(value).trim() === '') return String(value);
  return new Intl.NumberFormat(NUMBER_LOCALE[lang], { maximumFractionDigits: 2 }).format(n);
}

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_GB',
  de: 'de_CH',
  it: 'it_CH',
  fr: 'fr_CH',
};
