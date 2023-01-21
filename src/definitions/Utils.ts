import type { CasteRange, StateName } from '../definitions/types';

export const M3_to_CM3 = 1000000;

/**
 * Returns volume in cubic meters when given cubic centimeters
 *
 * @param cm3 - Volume in cubic centimeter
 * @returns Volume in cubic meter
 */
export const ConvertCm3ToM3 = (cm3: number): number => {
  return cm3 / M3_to_CM3;
};

/**
 * Returns a string describing the volume.
 *
 * @param volume_cm3 - Volume in cubic centimeter
 * @returns String describing the volume (w/ unit)
 */
export const SimplifyVolume = (volume_cm3: number): string => {
  // if (volume_cm3 >= 0.5 * M3_to_CM3) {
  //     let value = ConvertCm3ToM3(volume_cm3).toFixed(3)
  //     while(value.endsWith('0') || value.endsWith('.')) {
  //       value = value.slice(0,-1);
  //     }
  //     return `${value} m³`
  // }
  return `${volume_cm3.toLocaleString()} cm³`;
};

/**
 * Returns the given string with the first letter capitalized and the rest lower cased.
 *
 * @param str - String to convert to "Title Case"
 * @returns String in Title Case
 */
export const toTitleCase = (str: string): string => {
  if (typeof str !== 'string') {
    return '';
  }

  // Support strings with spaces, and make our title case very title-y
  if (/\s/.test(str)) {
    return str
      .split(/\s/)
      .filter((s) => s.length > 0)
      .map((s) => (s.length > 1 ? `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}` : s.toUpperCase()))
      .join(' ');
  }

  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

/**
 * Returns a single string containing all provided names.
 *
 * @param names - Either an array of names or a names_map to turn into a searchable name string
 * @returns A string with all names inside of it
 */
export const SearchableNames = (names: CasteRange<string[]> | string[]): string => {
  if (Array.isArray(names)) {
    return names.join(' ');
  }
  let flatNames: string[] = [];
  for (const k of Object.keys(names)) {
    for (const name of names[k]) {
      flatNames = flatNames.concat(name.split(' '));
    }
  }
  flatNames = flatNames.sort();
  const uniqueNames = [...new Set(flatNames)];
  return uniqueNames.join(' ');
};

/**
 * Returns a condensed string representing the array of names.
 *
 * @param names - Names in an array
 * @returns A string with names condensed as much as possible
 */
export const CleanName = (names: string[]): string => {
  if (names.length < 2) {
    return [...new Set(names)].filter((n) => n.length > 0).join(', ');
  }
  const singular = names[0];
  const plural = names[1];
  if (singular === plural || plural === '') {
    return `${singular}`;
  }
  if (plural.startsWith(singular)) {
    return `${singular}(${plural.slice(singular.length)})`;
  }
  if (plural.endsWith('men')) {
    if (plural.endsWith('women')) {
      return `${singular}/women`;
    }
    return `${singular}/men`;
  }
  return `${singular}, ${plural}`;
};

const GAME_TICKS_FORTRESS = {
  SEASON: 33_6000,
  WEEK: 8_400,
  DAY: 1_200,
  HOUR: 50,
  MINUTE: 5 / 6,
  SECOND: 1 / 72,
};
const GAME_TICKS_ADVENTURE = {
  SEASON: 14_515_200,
  WEEK: 4_838_400,
  DAY: 172_800,
  HOUR: 7_200,
  MINUTE: 120,
  SECOND: 2,
};

interface GameTicksDefinition {
  SEASON: number;
  WEEK: number;
  DAY: number;
  HOUR: number;
  MINUTE: number;
  SECOND: number;
}

export const TickToCalendarConversion = (gameTicks: number, fortressMode = true): string => {
  if (fortressMode) {
    return SpecificTickToCalendarConversion(gameTicks, GAME_TICKS_FORTRESS);
  } else {
    return SpecificTickToCalendarConversion(gameTicks, GAME_TICKS_ADVENTURE);
  }
};

const SpecificTickToCalendarConversion = (gameTicks: number, defined_spans: GameTicksDefinition): string => {
  let mutGameTicks = gameTicks;
  // Convert ticks to "time" for fortress mode
  const seasons = Math.floor(mutGameTicks / defined_spans.SEASON);
  mutGameTicks -= defined_spans.SEASON * seasons;
  const weeks = Math.floor(mutGameTicks / defined_spans.WEEK);
  mutGameTicks -= defined_spans.WEEK * weeks;
  const days = Math.floor(mutGameTicks / defined_spans.DAY);
  mutGameTicks -= defined_spans.DAY * days;
  const hours = Math.floor(mutGameTicks / defined_spans.HOUR);
  mutGameTicks -= defined_spans.HOUR * hours;
  const minutes = Math.floor(mutGameTicks / defined_spans.MINUTE);
  mutGameTicks -= defined_spans.MINUTE * minutes;
  const seconds = Math.floor(mutGameTicks / defined_spans.SECOND);
  mutGameTicks -= defined_spans.SECOND * seconds;

  const outStr: string[] = [];
  if (seasons) {
    outStr.push(`${seasons} Season${seasons > 1 ? 's' : ''}`);
  }
  if (weeks) {
    outStr.push(`${weeks} Week${weeks > 1 ? 's' : ''}`);
  }
  if (days) {
    outStr.push(`${days} Day${days > 1 ? 's' : ''}`);
  }
  if (hours || minutes) {
    outStr.push(`${hours}h ${minutes}m`);
  }

  // Ignore hours minutes seconds for now?

  return outStr.join(', ');
};

export function StatesIntoFlatArray(states: StateName): string[] {
  return [states.solid, states.liquid, states.gas];
}

const IgnoredSearchTerms = [
  'a',
  'and',
  'but',
  'for',
  'in',
  'it',
  'its',
  'of',
  'on',
  'that',
  'the',
  'they',
  'their',
  'with',
];

export function TransformIntoSearchTermString(searchableTerms: string[]): string {
  const alphaNormalizedTerms = searchableTerms
    .join(' ')
    .toLowerCase()
    .replace(/[\s\W]+/g, ' ')
    .split(' ')
    .filter((v) => v.length > 0 && IgnoredSearchTerms.indexOf(v) === -1);

  const uniqueSearchTerms = [...new Set(alphaNormalizedTerms)];

  return uniqueSearchTerms.join(' ');
}

/**
 * Helper function to turn the path from a drag and dropped file or the manually selected save folder
 * into an array of directories. This is done pretty crudely, it splits the path based on `/` unless if
 * finds `\` in the path, then it spits by `\`.
 *
 * @param path - path to split
 * @returns array of directories
 */
export function splitPathAgnostically(path: string): string[] {
  if (!path) {
    console.debug('Caught an empty path length');
    return [];
  }
  let pathDelineation = '/';
  if (path.indexOf('\\') !== -1) {
    pathDelineation = '\\';
  }
  const pathArr = path.split(pathDelineation);
  console.debug(`Path delineated to [${pathArr.join(', ')}]`);
  return pathArr;
}
