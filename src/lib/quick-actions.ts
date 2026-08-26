import { p, type Locale } from './i18n';
import { egumaUrl, simpleBookingUrl, SITE } from './site';

type QuickActionId = 'reserve' | 'vouchers' | 'fineDining' | 'bistrot' | 'contact';

export interface QuickAction {
  id: QuickActionId;
  href: string;
  label: string;
  mobileLines: readonly string[];
}

const labels = {
  en: {
    title: 'Plan your stay',
    reserve: ['Reserve a room', ['Reserve a Room']],
    vouchers: ['Vouchers', ['Vouchers']],
    fineDining: ['Book a table at Fine Dining', ['Book a Table', 'Fine Dining']],
    bistrot: ['Book a table at the Bistrot', ['Book a Table', 'Bistrot']],
    contact: ['Contact', ['Contact']],
  },
  de: {
    title: 'Aufenthalt planen',
    reserve: ['Zimmer reservieren', ['Zimmer reservieren']],
    vouchers: ['Gutscheine', ['Gutscheine']],
    fineDining: ['Tisch im Fine Dining reservieren', ['Tisch reservieren', 'Fine Dining']],
    bistrot: ['Tisch im Bistrot reservieren', ['Tisch reservieren', 'Bistrot']],
    contact: ['Kontakt', ['Kontakt']],
  },
  it: {
    title: 'Organizza il soggiorno',
    reserve: ['Prenota una camera', ['Prenota una camera']],
    vouchers: ['Voucher', ['Voucher']],
    fineDining: ['Prenota un tavolo al Fine Dining', ['Prenota un tavolo', 'Fine Dining']],
    bistrot: ['Prenota un tavolo al Bistrot', ['Prenota un tavolo', 'Bistrot']],
    contact: ['Contatti', ['Contatti']],
  },
  fr: {
    title: 'Préparer votre séjour',
    reserve: ['Réserver une chambre', ['Réserver une chambre']],
    vouchers: ['Bons cadeaux', ['Bons cadeaux']],
    fineDining: ['Réserver une table au Fine Dining', ['Réserver une table', 'Fine Dining']],
    bistrot: ['Réserver une table au Bistrot', ['Réserver une table', 'Bistrot']],
    contact: ['Contact', ['Contact']],
  },
} as const;

function item(
  id: QuickActionId,
  href: string,
  copy: readonly [string, readonly string[]],
): QuickAction {
  return { id, href, label: copy[0], mobileLines: copy[1] };
}

export function getQuickActions(lang: Locale): { title: string; items: QuickAction[] } {
  const copy = labels[lang];
  return {
    title: copy.title,
    items: [
      item('reserve', simpleBookingUrl(lang), copy.reserve),
      item('vouchers', egumaUrl('vouchers', lang), copy.vouchers),
      item('fineDining', SITE.integrations.theForkFineDining, copy.fineDining),
      item('bistrot', SITE.integrations.theForkBistrot, copy.bistrot),
      item('contact', p(lang, 'contact'), copy.contact),
    ],
  };
}
