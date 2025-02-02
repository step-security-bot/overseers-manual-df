// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CreatureEffectProperty } from './CreatureEffectProperty';

export interface CreatureEffect {
  severity: number;
  probability: number;
  affectedBodyPartsByCategory: Array<string>;
  affectedBodyPartsByType: Array<string>;
  affectedBodyPartsByToken: Array<string>;
  tags: Array<CreatureEffectProperty>;
  start: number;
  peak: number;
  end: number;
  dwfStretch: number;
}
