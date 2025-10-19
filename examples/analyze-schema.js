const { analyzeSchema } = require('../src');
const { aggregationCursor, disconnect } = require('./cursors');

const controller = new AbortController();

// Abort the analysis after 1 second
setTimeout(() => {
  controller.abort();
}, 1000);

analyzeSchema(aggregationCursor, {
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
