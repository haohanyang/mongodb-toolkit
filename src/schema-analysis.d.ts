import { type AggregationCursor } from 'mongodb';
import { type SchemaAccessor } from 'mongodb-schema';

type AnalyzeSchemaOptions = {
  abortSignal?: AbortSignal;
};

export function analyzeSchema(
  cursor: AggregationCursor,
  options?: AnalyzeSchemaOptions,
): Promise<SchemaAccessor>;
