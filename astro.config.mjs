// @ts-check
import { defineConfig } from 'astro/config';

// THE VIEW Lugano — static-first Astro build.
// No client framework is shipped: the only JavaScript on the site is a few
// small vanilla <script> islands (booking bar, gallery lightbox, language
// switcher, consent). This is deliberate — fast load is part of the product.
export default defineConfig({
  site: 'https://www.theviewlugano.com',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'de', 'it', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  image: {
    // Real property photography currently served from the property's own CDN
    // (see src/lib/photos.ts and DECISIONS.md §2 for the migration path to
    // local originals in src/assets/photos/).
    domains: ['d1vp8nomjxwyf1.cloudfront.net'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
