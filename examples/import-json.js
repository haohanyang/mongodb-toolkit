const { Readable } = require('stream');
const { importJSON } = require('../src');
const { testCollection, disconnect } = require('./collections');

importJSON(
  testCollection,
  Readable.from([`{"id":1,"name":"John"}\n{"id":2,"name":"Doe"}`]),
  {
    jsonVariant: 'jsonl',
  },
)
  .then((result) => {
    console.log(`Import result`, result);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    disconnect();
    process.exit(0);
  });
