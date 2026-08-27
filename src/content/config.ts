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

const localizedArray = z.object({
  en: z.array(z.string()),
  de: z.array(z.string()),
  it: z.array(z.string()),
  fr: z.array(z.string()),
});

const photoRef = z.object({
  src: z.string().url(),
  alt: localized, // required per-locale alt text
});

const homepage = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/homepage' }),
  schema: z.object({
    hero: z.object({
      line: localized,
      tagline: localized,
      image: z.string(),
    }),
    sections: z.array(z.object({
      id: z.string(),
      eyebrow: localized.optional(),
      title: localized,
      body: localizedArray,
      image: z.string(),
      ctaHref: z.string(),
      ctaLabel: localized,
      flip: z.boolean().default(false),
    })),
    days: z.object({
      eyebrow: localized,
      title: localized,
      items: z.array(z.object({
        id: z.string(),
        title: localized,
        body: localized,
        image: z.string(),
      })).length(5),
    }),
    trust: z.object({
      eyebrow: localized,
      title: localized,
      items: z.array(z.object({
        id: z.string(),
        text: localized,
      })),
    }),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    slug: z.string(),
    metaTitle: localized,
    metaDesc: localized,
    h1: localized,
    intro: localized,
    // Flexible optional fields for different page types
    honesty: localized.optional(),
    residenceNote: localized.optional(),
    restaurantTitle: localized.optional(),
    restaurantBody: localizedArray.optional(),
    terraceTitle: localized.optional(),
    terraceBody: localized.optional(),
    barTitle: localized.optional(),
    barBody: localized.optional(),
    breakfastTitle: localized.optional(),
    breakfastBody: localized.optional(),
    reserveTable: localized.optional(),
    menuNote: localized.optional(),
    philosophy: localized.optional(),
    treatmentsTitle: localized.optional(),
    treatmentsIntro: localized.optional(),
    hoursTitle: localized.optional(),
    hoursBody: localized.optional(),
    fitnessTitle: localized.optional(),
    fitnessBody: localized.optional(),
    bookTreatment: localized.optional(),
    cta: localized.optional(),
    voucherTitle: localized.optional(),
    voucherBody: localized.optional(),
    privateTitle: localized.optional(),
    privateBody: localized.optional(),
    meetingTitle: localized.optional(),
    meetingBody: localized.optional(),
    buyoutTitle: localized.optional(),
    buyoutBody: localized.optional(),
    honest: localized.optional(),
    filterAll: localized.optional(),
    catHotel: localized.optional(),
    catSuite: localized.optional(),
    catDining: localized.optional(),
    catTerrace: localized.optional(),
    catBar: localized.optional(),
    catSpa: localized.optional(),
    catMeeting: localized.optional(),
    catEvents: localized.optional(),
    catFleet: localized.optional(),
    lightboxClose: localized.optional(),
    lightboxPrev: localized.optional(),
    lightboxNext: localized.optional(),
    arrivingTitle: localized.optional(),
    byCar: localized.optional(),
    byTrain: localized.optional(),
    byAir: localized.optional(),
    aroundTitle: localized.optional(),
    aroundBody: localized.optional(),
    luganoTitle: localized.optional(),
    luganoBody: localized.optional(),
    body: localizedArray.optional(),
    mediaTitle: localized.optional(),
    mediaBody: localized.optional(),
    factsTitle: localized.optional(),
    factsBody: localized.optional(),
    whatsapp: localized.optional(),
    reserveTitle: localized.optional(),
    reserveBody: localized.optional(),
    tradeBody: localized.optional(),
    careersTitle: localized.optional(),
    careersBody: localized.optional(),
    readingTime: localized.optional(),
    published: localized.optional(),
  }),
});

// The sustainability page is deliberately its own singleton. Its long-form
// editorial content, SEO copy and image references can be maintained in
// SveltiaCMS without exposing page-specific fields on every other page.
const sustainability = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/sustainability' }),
  schema: z.object({
    hero: z.object({
      eyebrow: localized,
      image: z.string(),
      caption: localized,
      body: localizedArray,
    }),
    explorer: z.object({
      eyebrow: localized,
      title: localized,
      instruction: localized,
      items: z.array(z.object({
        id: z.string(),
        number: z.string(),
        title: localized,
        summary: localized,
        details: localizedArray,
        image: z.string(),
      })).min(1),
    }),
    standards: z.object({
      eyebrow: localized,
      title: localized,
      body: localized,
      points: z.array(localized).min(1),
      logos: z.array(z.object({
        id: z.string(),
        src: z.string(),
        alt: localized,
      })).min(1),
    }),
    next: z.object({
      eyebrow: localized,
      title: localized,
      intro: localized,
      items: z.array(z.object({
        title: localized,
        body: localized,
      })).min(1),
    }),
  }),
});

// Press & Awards has its own editable content model: the SEO essentials stay
// with the shared pages collection while the editorial layout and accreditation
// assets remain easy to maintain in one focused SveltiaCMS entry.
const press = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/press' }),
  schema: z.object({
    hero: z.object({
      eyebrow: localized,
      image: z.string(),
      alt: localized,
      caption: localized,
    }),
    awards: z.object({
      title: localized,
      intro: localized,
      items: z.array(z.object({
        id: z.string(),
        src: z.string(),
        width: z.number().positive(),
        height: z.number().positive(),
        alt: localized,
      })).min(1),
    }),
    media: z.object({
      title: localized,
      body: localized,
      cta: localized,
    }),
    facts: z.object({
      title: localized,
      body: localized,
    }),
  }),
});

// Contact has its own singleton so the guest-facing page, its visual asset,
// form labels and operational copy remain straightforward to update in
// SveltiaCMS. The shared pages entry continues to own title and meta data.
const contact = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/contact' }),
  schema: z.object({
    reach: z.object({
      eyebrow: localized,
      title: localized,
      body: localized,
      addressLabel: localized,
      phoneLabel: localized,
      whatsappLabel: localized,
      emailLabel: localized,
      salesEmailLabel: localized,
      salesEmail: z.string().email(),
      whatsappMessage: localized,
    }),
    form: z.object({
      title: localized,
      body: localized,
      nameLabel: localized,
      emailLabel: localized,
      topicLabel: localized,
      topicPlaceholder: localized,
      messageLabel: localized,
      submit: localized,
      privacy: localized,
      success: localized,
      error: localized,
      topics: z.array(z.object({
        value: z.string().min(1),
        label: localized,
      })).min(1),
    }),
    map: z.object({
      title: localized,
      body: localized,
      directions: localized,
    }),
    trade: z.object({
      title: localized,
      body: localized,
      gdsNote: localized,
    }),
    careers: z.object({
      title: localized,
      body: localized,
      email: z.string().email(),
    }),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/faq' }),
  schema: z.object({
    order: z.number(),
    question: localized,
    answer: localized,
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/legal' }),
  schema: z.object({
    slug: z.string(),
    title: localized,
    body: localizedArray,
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: z.object({
    nav: z.record(localized),
    common: z.record(localized),
    footer: z.record(localized),
    consent: z.record(localized),
    notFound: z.record(localized),
  }),
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
    category: z.enum(['rituals', 'massages', 'bodyTreatments', 'faceRituals', 'beauty']),
    name: localized,
    summary: localized,
    // Each treatment can have one or more duration/price variants
    // (e.g. 50' CHF 150.- / 80' CHF 190.-, or a flat per-item price list).
    variants: z.array(z.object({ duration: z.string(), price: z.string() })).min(1),
  }),
});

// The SPA landing page is its own singleton for the same reason contact and
// press are: a structured, page-specific content model (hero, treatment
// categories, a rotating "treatment of the month", night spa, sales
// categories) that would otherwise bloat the shared pages bag. SEO essentials
// (metaTitle, metaDesc, h1, intro) stay on the pages/spa-index entry.
const spaExperience = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/spa-experience' }),
  schema: z.object({
    hero: z.object({
      tagline: localized,
      alt: localized,
    }),
    philosophy: localized,
    treatments: z.object({
      title: localized,
      intro: localized,
      bookLabel: localized,
      categories: z.array(z.object({
        id: z.enum(['rituals', 'massages', 'bodyTreatments', 'faceRituals', 'beauty']),
        title: localized,
        intro: localized,
        note: localized.optional(),
      })).min(1),
    }),
    treatmentOfMonth: z.object({
      eyebrow: localized,
      ctaLabel: localized,
      months: z.array(z.object({
        month: z.number().min(1).max(12),
        treatmentSlug: z.string(),
        note: localized,
      })).min(12),
    }),
    nightSpa: z.object({
      eyebrow: localized,
      title: localized,
      body: localized,
      accessNote: localized,
      ctaLabel: localized,
    }),
    salesCategories: z.object({
      title: localized,
      intro: localized,
      ctaLabel: localized,
      items: z.array(z.object({
        id: z.string(),
        title: localized,
        body: localized,
      })).min(1),
    }),
    hours: z.object({ title: localized, body: localized }),
    fitness: z.object({ title: localized, body: localized }),
    booking: z.object({
      bookLabel: localized,
      giftLabel: localized,
    }),
    gallery: z.object({ title: localized }),
    variantLabels: z.object({
      eyebrows: localized,
      aboveLip: localized,
      face: localized,
      armpits: localized,
      arms: localized,
      chest: localized,
      back: localized,
      bikini: localized,
      halfLeg: localized,
      fullLeg: localized,
      naturalFinish: localized,
      nailPolish: localized,
    }),
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

export const collections = { homepage, pages, sustainability, press, contact, faq, legal, settings, suites, dining, spa, spaExperience, offers, journal };
