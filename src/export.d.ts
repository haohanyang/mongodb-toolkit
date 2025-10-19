import { AggregationCursor, FindCursor } from 'mongodb';
import { Writable } from 'stream';
import { Delimiter, Linebreak } from './common';

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
  variant?: ExportJSONFormat;
};

type ExportResult = {
  docsWritten: number;
  aborted: boolean;
};

/**
 * Exports data from MongoDB to a CSV format and writes it to the provided writable stream.
 * @param cursor MongoDB cursor from aggregation or query operation.
 * @param output Writable stream to write the CSV data to.
 * @param options
 */
export function exportCSV(
  cursor: AggregationCursor | FindCursor,
  output: Writable,
  options?: ExportCSVOptions,
): Promise<ExportResult>;

/**
 * Exports data from MongoDB to a JSON format and writes it to the provided writable stream.
 * @param cursor MongoDB cursor from aggregation or query operation.
 * @param output Writable stream to write the JSON data to.
 * @param options
 */
export function exportJSON(
  cursor: AggregationCursor | FindCursor,
  output: Writable,
  options?: ExportJSONOptions,
): Promise<ExportResult>;
