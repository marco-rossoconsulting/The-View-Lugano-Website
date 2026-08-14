import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every collection entry carries all four locales in frontmatter, validated —
// a page cannot ship with a missing translation. Alt text and structured
// amenity fields are required, not optional.

const localized = z.object({
  en: z.string().min(1),
  de: z.string().min(1),
  it: z.string().min(1),
  fr: z.string().min(1),
});

const photoRef = z.object({
  src: z.string().url(),
  alt: localized, // required per-locale alt text
});

const suites = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/suites' }),
  schema: z.object({
    order: z.number(),
    name: localized,
    sqm: z.number(),
    sleeps: z.number(),
    count: z.number(), // how many of this category exist
    lakeView: z.literal(true), // structurally guaranteed — cannot be false
    terrace: z.literal(true),
    photos: z.array(photoRef).min(1),
    summary: localized,
    body: z.object({ en: z.array(z.string()), de: z.array(z.string()), it: z.array(z.string()), fr: z.array(z.string()) }),
    amenities: z.array(localized).min(4), // structured amenity list, required
  }),
});

const dining = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/dining' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    kind: z.enum(['restaurant', 'terrace', 'bar']),
    photos: z.array(photoRef).min(1),
    summary: localized,
    facts: z.array(localized),
  }),
});

const spa = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/spa' }),
  schema: z.object({
    order: z.number(),
    name: localized,
    duration: z.string(), // e.g. "50 min"
    summary: localized,
  }),
});

const offers = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/offers' }),
  schema: z.object({
    order: z.number(),
    name: localized,
    summary: localized,
    body: z.object({ en: z.array(z.string()), de: z.array(z.string()), it: z.array(z.string()), fr: z.array(z.string()) }),
    includes: z.array(localized).min(2),
    photo: photoRef,
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/journal' }),
  schema: z.object({
    date: z.string(), // ISO date
    title: localized,
    excerpt: localized,
    body: z.object({ en: z.array(z.string()), de: z.array(z.string()), it: z.array(z.string()), fr: z.array(z.string()) }),
    photo: photoRef,
  }),
});

export const collections = { suites, dining, spa, offers, journal };
