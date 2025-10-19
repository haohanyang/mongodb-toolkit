import { AggregationCursor } from 'mongodb';
import { SchemaAccessor } from 'mongodb-schema';

type AnalyzeSchemaOptions = {
  abortSignal?: AbortSignal;
};

/**
 * Analyzes the schema of MongoDB collection
 * @param cursor MongoDB aggregation cursor pointing to the data to analyze.
 * @param options
 */
export function analyzeSchema(
  cursor: AggregationCursor,
  options?: AnalyzeSchemaOptions,
): Promise<SchemaAccessor>;
