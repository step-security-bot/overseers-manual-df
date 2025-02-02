import { Update } from '@tauri-apps/plugin-updater';
import { Biome } from '../definitions/Biome';
import { ObjectType } from '../definitions/ObjectType';
import { ProgressPayload } from '../definitions/ProgressPayload';
import { RawModuleLocation } from '../definitions/RawModuleLocation';
import { SearchResults } from '../definitions/SearchResults';
import { Summary } from '../definitions/Summary';

/**
 * Default update object. This is an empty update object which is used
 * when there is no update available or we are waiting for a response
 * from the update server.
 */
export const NO_UPDATE: Update = {
  currentVersion: '0.0.0',
  version: '0.0.0',
  downloadAndInstall: async (_cb) => {},
  body: 'No update currently available.',
  date: new Date().toISOString(),
};

/**
 * Default settings for the application. These are used when the application
 * is first run and the settings file is created. It is also used when the
 * settings file is corrupted or missing, or when the user resets the settings.
 */
export const SETTINGS_DEFAULTS = {
  dataVersion: 10,
  ready: false,
  layoutAsGrid: true,
  displayGraphics: true,
  resultsPerPage: 32,
  directoryPath: '',
  currentPage: 1,
  totalResults: 0,
  totalPages: 1,
  includeObjectTypes: ['Creature', 'Plant'] as ObjectType[],
  parseObjectTypes: ['Creature', 'Plant'] as ObjectType[],
  includeBiomes: [] as Biome[],
  parseLocations: ['Vanilla'] as RawModuleLocation[],
  includeLocations: ['Vanilla'] as RawModuleLocation[],
  includeModules: [] as string[],
};

/**
 * Name of the file to store the settings in.
 */
export const SETTINGS_FILE_NAME = 'settings.json';

/**
 * Currently parsing raw files.
 */
export const STS_PARSING = 'Parsing Raws';
/**
 * Currently loading the raw files into storage.
 */
export const STS_LOADING = 'Loading Raws';
/**
 * Awaiting new commands.
 */
export const STS_IDLE = 'Idle';
/**
 * Idle, but with no raws loaded.
 */
export const STS_EMPTY = 'Idle/No Raws';

/**
 * Default search results (empty).
 */
export const DEFAULT_SEARCH_RESULT: SearchResults = {
  results: [],
  totalPages: 1,
  totalResults: 0,
};

/**
 * Parsing status is sent back from the backend to the frontend
 * and is used to progress the current parsing status.
 *
 * This is an empty default value.
 */
export const DEFAULT_PARSING_STATUS: ProgressPayload = {
  currentModule: '',
  currentFile: '',
  currentLocation: '',
  currentTask: '',
  percentage: 0.0,
  runningTotal: 0,
};

/**
 * A summary of the parsing process is sent from the backend to
 * the frontend when the parsing is complete.
 *
 * This is an empty default value.
 */
export const DEFAULT_SUMMARY: Summary = {
  counts: [],
  locations: [],
  objectsAllowed: [],
  filteringDuration: '',
  parsingDuration: '',
  saveToStoreDuration: '',
  locationTotals: [],
  totalRaws: 0,
};

/**
 * A list of common words to ignore when searching.
 */
export const IgnoredSearchTerms = [
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

/**
 * The available depths as represented by the `UndergroundDepth` token.
 */
export const DepthRanges = [
  'Aboveground',
  '1st Cavern Layer',
  '2nd Cavern Layer',
  '3rd Cavern Layer',
  'Magma Sea Layer',
  'HFS',
];

/**
 * How many cubic centimeters are in a cubic meter.
 */
export const M3_to_CM3 = 1000000;

/**
 * The name for parsing progress event that is sent from the backend to the frontend.
 */
export const PARSING_PROGRESS_EVENT = 'PROGRESS';
export const PARSING_SUMMARY_EVENT = 'PARSE_SUMMARY';

export const COMMAND_PARSE_AND_STORE_RAWS = 'parse_and_store_raws';
export const COMMAND_SEARCH_RAWS = 'search_raws';
export const COMMAND_PARSE_RAWS_INFO = 'parse_raws_info';
export const COMMAND_SHOW_IN_FOLDER = 'show_in_folder';
export const COMMAND_GET_SEARCH_STRING_FOR_OBJECT = 'get_search_string_for_object';
export const COMMAND_GET_BIOME_DESCRIPTION = 'get_biome_description';
export const COMMAND_GET_GRAPHICS_FOR_IDENTIFIER = 'get_graphics_for_identifier';
export const COMMAND_GET_BUILD_INFO = 'get_build_info';
