// Real property photography manifest.
// Every image below is an actual photograph of THE VIEW Lugano, currently
// served from the property's own media CDN. No stock imagery anywhere.
// Migration path to local originals: DECISIONS.md §2.

const CDN = 'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/456';

export interface Photo {
  src: string;
  alt: Record<string, string>; // per-locale alt text, required
  category:
    | 'hotel'
    | 'suite'
    | 'dining'
    | 'terrace'
    | 'bar'
    | 'spa'
    | 'meeting'
    | 'events'
    | 'fleet';
  width: number;
  height: number;
}

// Source files on the CDN are landscape originals around 1600–2000px.
// 1600×1067 (3:2) is used as the declared intrinsic size; astro:assets
// generates the responsive AVIF/WebP set from it.
const W = 1600;
const H = 1067;

function photo(
  path: string,
  category: Photo['category'],
  alt: Photo['alt'],
): Photo {
  return { src: `${CDN}/${path}`, category, width: W, height: H, alt };
}

export const PHOTOS: Photo[] = [
  photo('2018/07/12135345/hotel_012.jpg', 'hotel', {
    en: 'The building at Paradiso seen from the lake side, every terrace facing the water',
    de: 'Das Haus in Paradiso von der Seeseite, jede Terrasse zum Wasser gerichtet',
    it: "L'edificio a Paradiso visto dal lato del lago, ogni terrazza rivolta all'acqua",
    fr: 'Le bâtiment à Paradiso vu du côté lac, chaque terrasse tournée vers l’eau',
  }),
  photo('2018/07/12135354/hotel_032.jpg', 'hotel', {
    en: 'The lounge with the lake filling the window',
    de: 'Die Lounge, der See füllt das Fenster',
    it: 'La lounge, con il lago che riempie la finestra',
    fr: 'Le salon, le lac remplissant la fenêtre',
  }),
  photo('2018/07/12135358/hotel_041.jpg', 'hotel', {
    en: 'Evening light over Lake Lugano from the upper terrace',
    de: 'Abendlicht über dem Luganersee von der oberen Terrasse',
    it: 'Luce della sera sul Ceresio dalla terrazza superiore',
    fr: 'Lumière du soir sur le lac de Lugano depuis la terrasse supérieure',
  }),
  photo('2018/07/12135403/hotel_051.jpg', 'hotel', {
    en: 'The outdoor pool at the edge of the hillside, lake beyond',
    de: 'Der Aussenpool am Rand des Hangs, dahinter der See',
    it: "La piscina esterna sul bordo della collina, oltre c'è il lago",
    fr: 'La piscine extérieure au bord de la colline, le lac au-delà',
  }),
  photo('2018/07/12135407/hotel_061.jpg', 'hotel', {
    en: 'The entrance drive at dusk',
    de: 'Die Einfahrt in der Dämmerung',
    it: "Il viale d'ingresso al crepuscolo",
    fr: 'L’allée d’entrée au crépuscule',
  }),
  photo('2018/12/12104412/%C2%A9r.patti_6871.jpg', 'hotel', {
    en: 'Outdoor fitness trail on Monte San Salvatore, overlooking Lugano',
    de: 'Outdoor-Fitnesspfad am Monte San Salvatore mit Blick über Lugano',
    it: 'Percorso fitness all’aperto sul Monte San Salvatore, con vista su Lugano',
    fr: 'Parcours de fitness en plein air sur le Monte San Salvatore, avec vue sur Lugano',
  }),
  photo('2018/07/12135418/hotel_09.jpg', 'hotel', {
    en: 'Clean ship-line architecture of the facade',
    de: 'Die klare, schiffsähnliche Linienführung der Fassade',
    it: 'Le linee pulite, da nave, della facciata',
    fr: 'Les lignes nettes, façon navire, de la façade',
  }),
  photo('2018/07/12140935/room_012.jpg', 'suite', {
    en: 'Junior Suite with the bed set toward the lake',
    de: 'Junior Suite, das Bett zum See ausgerichtet',
    it: 'Junior Suite con il letto rivolto verso il lago',
    fr: 'Junior Suite, le lit orienté vers le lac',
  }),
  photo('2018/07/12140644/room_021.jpg', 'suite', {
    en: 'Suite living area opening onto the private terrace',
    de: 'Wohnbereich der Suite mit Übergang zur privaten Terrasse',
    it: 'Zona giorno della suite aperta sulla terrazza privata',
    fr: 'Séjour de la suite ouvrant sur la terrasse privée',
  }),
  photo('2018/07/12140649/room_031.jpg', 'suite', {
    en: 'Suite interior in daylight, lake in the window',
    de: 'Suite bei Tageslicht, der See im Fenster',
    it: 'Interno della suite alla luce del giorno, il lago nella finestra',
    fr: 'Intérieur de suite en lumière du jour, le lac dans la fenêtre',
  }),
  photo('2018/07/12140654/room_041.jpg', 'suite', {
    en: 'Bathroom with freestanding tub',
    de: 'Bad mit freistehender Wanne',
    it: 'Bagno con vasca freestanding',
    fr: 'Salle de bains avec baignoire îlot',
  }),
  photo('2018/07/12140659/room_051.jpg', 'suite', {
    en: 'Suite Superior across its full width',
    de: 'Suite Superior in ganzer Breite',
    it: 'Suite Superior in tutta la sua larghezza',
    fr: 'Suite Superior sur toute sa largeur',
  }),
  photo('2018/07/12141621/room_15.jpg', 'suite', {
    en: 'Private terrace with loungers above the lake',
    de: 'Private Terrasse mit Liegen über dem See',
    it: 'Terrazza privata con lettini sopra il lago',
    fr: 'Terrasse privée avec transats au-dessus du lac',
  }),
  photo('2020/07/20131235/the-view-lugano-fine-dining-restaurant.jpg', 'dining', {
    en: 'THE VIEW Fine Dining dining room at evening service',
    de: 'Der Speisesaal von THE VIEW Fine Dining am Abendservice',
    it: 'La sala di THE VIEW Fine Dining al servizio serale',
    fr: 'La salle de THE VIEW Fine Dining au service du soir',
  }),
  photo('2020/07/20151423/the-view-lugano-fine-dining-restaurant-food.jpg', 'dining', {
    en: 'A course from Chef Diego Della Schiava’s menu',
    de: 'Ein Gang aus dem Menü von Chef Diego Della Schiava',
    it: 'Una portata dal menu dello Chef Diego Della Schiava',
    fr: 'Un plat du menu du Chef Diego Della Schiava',
  }),
  photo('2020/07/20151831/The-View-Lugano-amouse-bouche.jpg', 'dining', {
    en: 'Amuse-bouche at THE VIEW Fine Dining',
    de: 'Amuse-Bouche im THE VIEW Fine Dining',
    it: 'Amuse-bouche al THE VIEW Fine Dining',
    fr: 'Amuse-bouche au THE VIEW Fine Dining',
  }),
  photo('2018/07/12141928/dining_01.jpg', 'dining', {
    en: 'Table set by the window, lake below',
    de: 'Gedeckter Tisch am Fenster, darunter der See',
    it: 'Tavolo apparecchiato alla finestra, il lago sotto',
    fr: 'Table dressée près de la fenêtre, le lac en contrebas',
  }),
  photo('2018/07/20080758/terrazza-1.jpg', 'terrace', {
    en: 'Terrazza TreCinqueZero at golden hour',
    de: 'Terrazza TreCinqueZero zur goldenen Stunde',
    it: "Terrazza TreCinqueZero all'ora dorata",
    fr: 'Terrazza TreCinqueZero à l’heure dorée',
  }),
  photo('2018/07/20080806/terrazza-3.jpg', 'terrace', {
    en: 'Aperitivo on the terrace above the lake',
    de: 'Aperitivo auf der Terrasse über dem See',
    it: 'Aperitivo in terrazza sopra il lago',
    fr: 'Aperitivo sur la terrasse au-dessus du lac',
  }),
  photo('2018/07/12142536/terrace_011.jpg', 'terrace', {
    en: 'The panoramic terrace at midday',
    de: 'Die Panoramaterrasse am Mittag',
    it: 'La terrazza panoramica a mezzogiorno',
    fr: 'La terrasse panoramique à midi',
  }),
  photo('2018/07/12143653/pommery_021.jpg', 'bar', {
    en: 'The Lounge Bar, glasses ready before evening',
    de: 'Die Lounge Bar, die Gläser bereit vor dem Abend',
    it: 'La Lounge Bar, i bicchieri pronti prima di sera',
    fr: 'Le Lounge Bar, les verres prêts avant le soir',
  }),
  photo('2018/07/12143445/pommery_01.jpg', 'bar', {
    en: 'Champagne service in the lounge',
    de: 'Champagnerservice in der Lounge',
    it: 'Servizio di champagne nella lounge',
    fr: 'Service du champagne au salon',
  }),
  photo('2018/07/12144600/spa_011.jpg', 'spa', {
    en: 'The indoor pool of THE VIEW SPA, lake through the glass',
    de: 'Der Innenpool des THE VIEW SPA, der See hinter dem Glas',
    it: "La piscina interna della THE VIEW SPA, il lago oltre il vetro",
    fr: 'La piscine intérieure du THE VIEW SPA, le lac derrière la vitre',
  }),
  photo('2018/07/12144502/spa_021.jpg', 'spa', {
    en: 'Relaxation area with Himalayan salt wall',
    de: 'Ruhebereich mit Himalaya-Salzwand',
    it: 'Area relax con parete di sale himalayano',
    fr: 'Espace détente avec mur de sel de l’Himalaya',
  }),
  photo('2018/07/12144507/spa_031.jpg', 'spa', {
    en: 'Treatment room prepared for a guest',
    de: 'Behandlungsraum, vorbereitet für einen Gast',
    it: 'Cabina trattamenti preparata per un ospite',
    fr: 'Cabine de soin préparée pour un hôte',
  }),
  photo('2018/07/04151715/SPA_TREATMENTS.jpg', 'spa', {
    en: 'Massage treatment at THE VIEW SPA',
    de: 'Massagebehandlung im THE VIEW SPA',
    it: 'Trattamento massaggio alla THE VIEW SPA',
    fr: 'Soin de massage au THE VIEW SPA',
  }),
  photo('2018/07/19135519/foto-10_0538.jpg', 'meeting', {
    en: 'The meeting room set for a small board session, lake beyond the glass',
    de: 'Der Meetingraum für eine kleine Sitzung eingedeckt, der See hinter dem Glas',
    it: 'La sala riunioni allestita per un piccolo board, il lago oltre il vetro',
    fr: 'La salle de réunion dressée pour un petit conseil, le lac derrière la vitre',
  }),
  photo('2018/07/20081611/eventi.jpg', 'events', {
    en: 'A private dinner set on the terrace',
    de: 'Ein privates Dinner auf der Terrasse',
    it: 'Una cena privata allestita in terrazza',
    fr: 'Un dîner privé dressé sur la terrasse',
  }),
  photo('2018/07/19135640/039_1DP0060.jpg', 'events', {
    en: 'Celebration table for a small private party',
    de: 'Festtafel für eine kleine private Gesellschaft',
    it: 'Tavola per una piccola festa privata',
    fr: 'Table de fête pour une petite réception privée',
  }),
  photo('2018/07/20081351/smart-2.jpg', 'fleet', {
    en: 'One of the electric Smart cars included with the stay',
    de: 'Einer der elektrischen Smarts, im Aufenthalt inbegriffen',
    it: 'Una delle Smart elettriche incluse nel soggiorno',
    fr: 'L’une des Smart électriques comprises dans le séjour',
  }),
  photo('2018/07/20081516/bici-1.jpg', 'fleet', {
    en: 'E-bikes ready at the entrance',
    de: 'E-Bikes bereit am Eingang',
    it: "E-bike pronte all'ingresso",
    fr: 'Vélos électriques prêts à l’entrée',
  }),
];

export const HERO = PHOTOS[0]; // lakeside architecture — the thesis image

export function byCategory(cat: Photo['category']): Photo[] {
  return PHOTOS.filter((ph) => ph.category === cat);
}

export function find(pathFragment: string): Photo {
  const hit = PHOTOS.find((ph) => ph.src.includes(pathFragment));
  if (!hit) throw new Error(`Photo not found: ${pathFragment}`);
  return hit;
}
