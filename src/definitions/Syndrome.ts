// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { SyndromeToken } from './SyndromeToken';

export interface Syndrome {
  identifier: string;
  name: string;
  affectedClasses: Array<string>;
  immuneClasses: Array<string>;
  affectedCreatures: Array<[string, string]>;
  immuneCreatures: Array<[string, string]>;
  classes: Array<string>;
  concentrationAdded: Array<number>;
  tags: Array<SyndromeToken>;
  conditions: Array<string>;
}
