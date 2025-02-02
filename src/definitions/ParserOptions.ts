// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ObjectType } from './ObjectType';
import type { ParsingJob } from './ParsingJob';
import type { RawModuleLocation } from './RawModuleLocation';

export interface ParserOptions {
  attachMetadataToRaws: boolean;
  skipApplyCopyTagsFrom: boolean;
  skipApplyCreatureVariations: boolean;
  rawsToParse: Array<ObjectType>;
  locationsToParse: Array<RawModuleLocation>;
  targetPath: string;
  job: ParsingJob;
  serializeResultToJson: boolean;
  outputPath: string;
  outputToFile: boolean;
}
