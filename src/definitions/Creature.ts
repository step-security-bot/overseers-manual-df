import { Raw, CasteRangeSpecifier } from './Raw';

export type BodySizeRange = {
  years: number;
  days: number;
  size_cm3: number;
};

export type CasteBodySizeRange = {
  [key: string]: BodySizeRange[];
};

export type Creature = {
  max_age: CasteRangeSpecifier;
  lays_eggs: boolean;
  clutch_size: CasteRangeSpecifier;
  based_on?: Creature;
  biomes: string[];
  cluster_range: number[];
  body_size: CasteBodySizeRange;
} & Raw;

/**
 * Returns true if the raw is a Creature raw.
 *
 * @param raw - The parsed raw to check.
 * @returns True if the raw is a creature.
 */
export function isCreature(raw: Raw | Creature): boolean {
  return (<Creature>raw).lays_eggs !== undefined;
}

/**
 * Returns a short description of the creature's egg-laying behavior.
 *
 * @param creature - Creature to get the egg-laying status for.
 * @returns Text to describe the egg-laying of the creature.
 */
export const EggLayingStatus = (creature: Creature): string => {
  if (!creature.lays_eggs) {
    return "Doesn't lay eggs.";
  }
  const keys = Object.keys(creature.clutch_size);
  if (keys.length === 0) {
    return 'Lays an unknown quantity of eggs.';
  }
  let ret = '';
  for (const k in creature.clutch_size) {
    ret += `${k[0]}${k.slice(1).toLowerCase()}s lay ${creature.clutch_size[k].join(' - ')} eggs.`;
  }
  return ret;
};

/**
 * Returns a short description of the creature's life expectancy.
 *
 * @param creature - Creature to get the life expectancy of.
 * @returns Text to describe the life expectancy of the creature.
 */
export const LifeExpectancyStatus = (creature: Creature): string => {
  const keys = Object.keys(creature.max_age);
  if (keys.length === 0) {
    return 'Lives indefinitely.';
  }
  if (keys.length === 1) {
    return `Live ${creature.max_age[keys[0]].join(' - ')} years.`;
  }
  let ret = '';
  for (const c in creature.max_age) {
    ret += `${c} lives ${creature.max_age[c].join(' - ')} years.`;
  }
  return ret;
};

/**
 * Returns a short description of the creatures spawning patterns.
 *
 * @param creature - Creature to get the spawning group size of
 * @returns Text to describe the spawning patterns
 */
export const ClusterSizeStatus = (creature: Creature): string => {
  const [min, max] = creature.cluster_range;
  if (min === max) {
    if (max === 0) {
      return 'They do not normally appear.';
    }
    if (max === 1) {
      return 'They always appear alone.';
    }
    return `They always appear in groups of ${min}`;
  }
  return `They appear in groups of ${min} to ${max} individuals.`;
};

/**
 * Returns a short text description of a BodySizeRange.
 *
 * @param size - The body size range to turn into a string
 * @returns Text to describe the body size range value
 */
export const BodySizeStatus = (size: BodySizeRange): string => {
  if (size.years === 0) {
    if (size.days === 0) {
      return `${size.size_cm3} cm³ at birth`;
    } else {
      return `${size.size_cm3} cm³ at ${size.days} days;`;
    }
  }
  if (size.days === 0) {
    return `${size.size_cm3} cm³ at ${size.years} years`;
  }
  return `${size.size_cm3} cm³ at ${size.years} years, ${size.days} days`;
};
