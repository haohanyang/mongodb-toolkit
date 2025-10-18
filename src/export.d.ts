import { AggregationCursor, FindCursor } from 'mongodb';
import { Writable } from 'stream';

declare const supportedDelimiters: readonly [',', '\t', ';', ' '];
declare const supportedLinebreaks: readonly ['\r\n', '\n'];

type Delimiter = (typeof supportedDelimiters)[number];
type Linebreak = (typeof supportedLinebreaks)[number];

type CSVExportPhase = 'DOWNLOAD' | 'WRITE';
type ProgressCallback = (index: number, phase: CSVExportPhase) => void;

type ExportJSONFormat = 'default' | 'relaxed' | 'canonical';

type ExportCSVOptions = {
  abortSignal?: AbortSignal;
  progressCallback?: ProgressCallback;
  delimiter?: Delimiter;
  linebreak?: Linebreak;
};

type ExportJSONOptions = {
  abortSignal?: AbortSignal;
  progressCallback?: (index: number) => void;
  variant: ExportJSONFormat;
};

type ExportResult = {
  docsWritten: number;
  aborted: boolean;
};

export function exportCSV(
  cursor: AggregationCursor | FindCursor,
  output: Writable,
  options?: ExportCSVOptions,
): Promise<ExportResult>;
export function exportJSON(
  cursor: AggregationCursor | FindCursor,
  output: Writable,
  options?: ExportJSONOptions,
): Promise<ExportResult>;
