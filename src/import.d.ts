import { Writable, Readable } from 'stream';
import { Collection, Document } from 'mongodb';

declare const supportedDelimiters: readonly [',', '\t', ';', ' '];
declare const supportedLinebreaks: readonly ['\r\n', '\n'];

type Delimiter = (typeof supportedDelimiters)[number];
type Linebreak = (typeof supportedLinebreaks)[number];

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

type ImportResult = {
  aborted?: boolean;
  docsWritten: number;
  docsProcessed: number;
  docsErrored: number;
  biggestDocSize: number;
  hasUnboundArray: boolean;
};

export function importCSVFromFile(
  collection: Collection<Document>,
  filePath: string,
  options?: ImportCSVOptions,
): Promise<ImportResult>;

export function importCSV(
  collection: Collection<Document>,
  input: Readable,
  options: ImportCSVOptions,
): Promise<ImportResult>;
