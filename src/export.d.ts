import { type AggregationCursor, type FindCursor } from 'mongodb'
import { type Writable } from 'stream'


type Delimiter = ',' | '\t' | ';' | ' '
type Linebreak = '\r\n' | '\n'

type CSVExportPhase = 'DOWNLOAD' | 'WRITE';
type ProgressCallback = (index: number, phase: CSVExportPhase) => void;


type ExportCSVOptions = {
    abortSignal?: AbortSignal;
    progressCallback?: ProgressCallback;
    delimiter?: Delimiter;
    linebreak?: Linebreak;
};

type ExportResult = {
    docsWritten: number;
    aborted: boolean;
};


export function exportCSV(cursor: AggregationCursor | FindCursor, output: Writable, options?: ExportCSVOptions): Promise<ExportResult>;
