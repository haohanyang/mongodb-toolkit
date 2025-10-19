import { analyzeSchema } from '../src';
import { getMongoClient, disconnect } from './shared';

const mongoClient = getMongoClient();

const controller = new AbortController();

// Sample 100 docs
const cursor = mongoClient
  .db('sample_mflix')
  .collection('comments')
  .aggregate([{ $limit: 100 }]);

// Abort the analysis after 1 second
setTimeout(() => {
  controller.abort();
}, 1000);


analyzeSchema(cursor, {
  abortSignal: controller.signal,
})
  .then((schema) => {
    if (!schema) {
      // Aborted
      throw new Error('Schema analysis aborted');
    }
    return schema.getMongoDBJsonSchema();
  })
  .then((jsonSchema) => {
    console.log(jsonSchema);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    disconnect();
    process.exit(0);
  });
