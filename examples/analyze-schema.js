const { analyzeSchema } = require('../src');
const { aggregationCursor, disconnect } = require('./cursors');

analyzeSchema(aggregationCursor)
  .then((schema) => schema.getMongoDBJsonSchema())
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
