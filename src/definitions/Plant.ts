// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Biome } from './Biome';
import type { Material } from './Material';
import type { Metadata } from './Metadata';
import type { Name } from './Name';
import type { PlantGrowth } from './PlantGrowth';
import type { PlantTag } from './PlantTag';
import type { Shrub } from './Shrub';
import type { Tree } from './Tree';

export interface Plant {
  metadata: Metadata;
  identifier: string;
  objectId: string;
  name: Name;
  prefStrings: Array<string>;
  tags: Array<PlantTag>;
  undergroundDepth: Array<number>;
  frequency: number;
  biomes: Array<Biome>;
  growths: Array<PlantGrowth>;
  treeDetails?: Tree;
  shrubDetails?: Shrub;
  materials: Array<Material>;
}
