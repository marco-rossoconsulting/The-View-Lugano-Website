import type { ImageMetadata } from 'astro';
import juniorSuiteLakeView from '../assets/images/suites/the-view-lugano-junior-suite-lake-view-01.jpg';
import juniorSuiteTerrace from '../assets/images/suites/the-view-lugano-junior-suite-terrace-02.jpg';
import juniorSuiteBedroom from '../assets/images/suites/the-view-lugano-junior-suite-lake-view-bedroom-03.jpg';
import classicJuniorSuiteLakeView from '../assets/images/suites/the-view-lugano-classic-junior-suite-lake-view-01.jpg';
import classicJuniorSuiteInterior from '../assets/images/suites/the-view-lugano-classic-junior-suite-interior-02.jpg';
import classicJuniorSuiteBathroom from '../assets/images/suites/the-view-lugano-classic-junior-suite-bathroom-03.jpg';
import suiteSuperiorBedroom from '../assets/images/suites/the-view-lugano-suite-superior-bedroom-01.jpg';
import suiteSuperiorLounge from '../assets/images/suites/the-view-lugano-suite-superior-lake-view-lounge-02.jpg';
import suiteSuperiorBathroom from '../assets/images/suites/the-view-lugano-suite-superior-bathroom-03.jpg';
import residenceLivingSpace from '../assets/images/suites/the-view-lugano-residence-living-space-01.jpg';
import residenceDiningArea from '../assets/images/suites/the-view-lugano-residence-dining-area-02.jpg';
import residenceBedroom from '../assets/images/suites/the-view-lugano-residence-bedroom-03.jpg';
import residenceSittingArea from '../assets/images/suites/the-view-lugano-residence-sitting-area-04.jpg';
import residenceKitchenDining from '../assets/images/suites/the-view-lugano-residence-kitchen-dining-05.jpg';
import residenceLivingRoom from '../assets/images/suites/the-view-lugano-residence-living-room-06.jpg';
import { SITE } from './site';

// The content collection holds stable, readable image paths. This map resolves
// them to Astro image metadata so each gallery receives responsive AVIF and
// WebP sources without putting large originals in the public directory.
const roomPhotos: Record<string, ImageMetadata> = {
  '/images/suites/the-view-lugano-junior-suite-lake-view-01.jpg': juniorSuiteLakeView,
  '/images/suites/the-view-lugano-junior-suite-terrace-02.jpg': juniorSuiteTerrace,
  '/images/suites/the-view-lugano-junior-suite-lake-view-bedroom-03.jpg': juniorSuiteBedroom,
  '/images/suites/the-view-lugano-classic-junior-suite-lake-view-01.jpg': classicJuniorSuiteLakeView,
  '/images/suites/the-view-lugano-classic-junior-suite-interior-02.jpg': classicJuniorSuiteInterior,
  '/images/suites/the-view-lugano-classic-junior-suite-bathroom-03.jpg': classicJuniorSuiteBathroom,
  '/images/suites/the-view-lugano-suite-superior-bedroom-01.jpg': suiteSuperiorBedroom,
  '/images/suites/the-view-lugano-suite-superior-lake-view-lounge-02.jpg': suiteSuperiorLounge,
  '/images/suites/the-view-lugano-suite-superior-bathroom-03.jpg': suiteSuperiorBathroom,
  '/images/suites/the-view-lugano-residence-living-space-01.jpg': residenceLivingSpace,
  '/images/suites/the-view-lugano-residence-dining-area-02.jpg': residenceDiningArea,
  '/images/suites/the-view-lugano-residence-bedroom-03.jpg': residenceBedroom,
  '/images/suites/the-view-lugano-residence-sitting-area-04.jpg': residenceSittingArea,
  '/images/suites/the-view-lugano-residence-kitchen-dining-05.jpg': residenceKitchenDining,
  '/images/suites/the-view-lugano-residence-living-room-06.jpg': residenceLivingRoom,
};

export function resolveRoomPhoto(src: string): ImageMetadata | string {
  return roomPhotos[src] ?? src;
}

export function roomPhotoUrl(src: string): string {
  const photo = resolveRoomPhoto(src);
  const path = typeof photo === 'string' ? photo : photo.src;
  return new URL(path, SITE.url).toString();
}
