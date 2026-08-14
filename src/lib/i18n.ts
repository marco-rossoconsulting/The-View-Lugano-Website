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

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_GB',
  de: 'de_CH',
  it: 'it_CH',
  fr: 'fr_CH',
};
