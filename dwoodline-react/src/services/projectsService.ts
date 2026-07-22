/**
 * Portfolio project gallery data.
 *
 * Ported from the `projects` object in 04-portfolio.html. Each project name maps
 * to six placeholder gallery images (picsum seeds preserved verbatim). Real
 * photography will replace these via hosting later.
 */

export interface ProjectGallery {
  name: string;
  images: string[];
}

function seedImages(prefix: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/${prefix}${i + 1}/800/600`,
  );
}

const GALLERIES: Record<string, string[]> = {
  'The Obsidian Penthouse': seedImages('op', 6),
  'Amanita Sky Suites': seedImages('as', 6),
  'The Ritz Suites': seedImages('rs', 6),
  'Zenith Wellness Club': seedImages('zw', 6),
  'Corporate Headquarters': seedImages('ch', 6),
  'The Linear Office': seedImages('lo', 6),
};

/** Returns the gallery image list for a project, or an empty array if unknown. */
export function getProjectGallery(name: string): ProjectGallery {
  return { name, images: GALLERIES[name] ?? [] };
}
