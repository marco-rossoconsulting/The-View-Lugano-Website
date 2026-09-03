import type { APIRoute } from 'astro';
import { LOCALES } from '../lib/i18n';
import { SITE } from '../lib/site';
import { getCollection } from 'astro:content';

const STATIC_ROUTES = [
  '',
  'suites',
  'dining',
  'spa',
  'move',
  'experiences',
  'events',
  'gallery',
  'location',
  'sustainability',
  'press',
  'journal',
  'contact',
  'legal/impressum',
  'legal/privacy',
  'legal/terms',
  'legal/cookies',
];

export const GET: APIRoute = async () => {
  const suites = await getCollection('suites');
  const journal = await getCollection('journal');
  const routes = [
    ...STATIC_ROUTES,
    ...suites.map((s) => `suites/${s.id}`),
    ...journal.map((j) => `journal/${j.id}`),
  ];

  const urls = routes
    .map((route) => {
      const path = (l: string) => (route ? `/${l}/${route}/` : `/${l}/`);
      const links = LOCALES.map(
        (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE.url}${path(l)}"/>`
      ).join('');
      const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}${path('en')}"/>`;
      return LOCALES.map(
        (l) => `<url><loc>${SITE.url}${path(l)}</loc>${links}${xDefault}</url>`
      ).join('');
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
