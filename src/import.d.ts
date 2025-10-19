import { Writable, Readable } from 'stream';
import { Collection, Document } from 'mongodb';
import { Delimiter, Linebreak } from './common';

type JSONVariant = 'json' | 'jsonl';

type ImportProgress = {
  bytesProcessed: number;
  docsProcessed: number;
  docsWritten: number;
};

type ErrorJSON = {
  name: string;
  message: string;
  index?: number;
  code?: string | number;
  op?: any;
  errInfo?: Document;
  numErrors?: number;
};

declare const parsableFieldTypes: readonly [
  // detectableFieldTypes,
  'int',
  'long',
  'double',
  'boolean',
  'date',
  'string',
  'objectId',
  'uuid',
  'regex',
  'minKey',
  'maxKey',
  // ejson is not a real type, but the fallback for otherwise unserializable
  // values like javascript, javascriptWithCode, DBRef (which itself is just a
  // convention, not a type) and whatever new types get added. It also covers
  // arrays and objects exported by mongoexport. So we detect those as ejson and
  // then we can import them.
  'ejson',
  'null',

  'binData',
  'md5',
  'timestamp',
  'decimal',
  'number', // like 'mixed', but for use when everything is an int, long or double.
  'mixed',
];
type CSVParsableFieldType = (typeof parsableFieldTypes)[number];
type IncludedFields = Record<string, CSVParsableFieldType>;

type ImportOptions = {
  output?: Writable;
  abortSignal?: AbortSignal;
  progressCallback?: (progress: ImportProgress) => void;
  errorCallback?: (error: ErrorJSON) => void;
  stopOnErrors?: boolean;
};

type ImportCSVOptions = ImportOptions & {
  ignoreEmptyStrings?: boolean;
  delimiter?: Delimiter;
  newline?: Linebreak;
  fields?: IncludedFields;
};

type ImportJSONOptions = ImportOptions & {
  jsonVariant?: JSONVariant;
};

type ImportResult = {
  aborted?: boolean;
  docsWritten: number;
  docsProcessed: number;
  docsErrored: number;
  biggestDocSize: number;
  hasUnboundArray: boolean;
};

/**
 * Imports data from a CSV file into MongoDB. The function will analyze the CSV delimiter, linebreaks, and fields automatically if not provided in the options.
 * @param collection MongoDB collection to import data into.
 * @param filePath Path to the CSV file to import.
 * @param options
 */
export function importCSVFromFile(
  collection: Collection,
  filePath: string,
  options?: ImportCSVOptions,
): Promise<ImportResult>;

/**
 * Imports data from a CSV stream into MongoDB. The user must provide `fields` in the options to specify the expected fields and their types.
 * @param collection MongoDB collection to import data into.
 * @param input Readable CSV stream.
 * @param options
 */
export function importCSV(
  collection: Collection<Document>,
  input: Readable,
  options: ImportCSVOptions,
): Promise<ImportResult>;

/**
 * Imports data from a JSON stream into MongoDB.
 * @param collection MongoDB collection to import data into.
 * @param input Readable JSON stream.
 * @param options
 */
export function importJSON(
  collection: Collection<Document>,
  input: Readable,
  options?: ImportJSONOptions,
): Promise<ImportResult>;
