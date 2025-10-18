const { analyzeSchema } = require('../src');
const { aggregationCursor } = require('./cursors');

analyzeSchema(aggregationCursor)
  .then((schema) => schema.getMongoDBJsonSchema())
  .then((jsonSchema) => {
    console.log(jsonSchema);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    process.exit(0);
  });
