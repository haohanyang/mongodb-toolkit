const path = require('path');
const { createReadStream } = require('fs');
const { importCSVFromFile, importCSV } = require('../src');
const { testCollection, disconnect } = require('./collections');

const csvFilePath = path.resolve(__dirname, 'example.csv');

Promise.all([
  importCSVFromFile(testCollection, csvFilePath),
  importCSV(testCollection, createReadStream(csvFilePath), {
    fields: { id: 'int', name: 'string' },
  }),
])
  .then((results) => {
    console.log(`Import results`);
    results.forEach((result, index) => {
      console.log(`--- Import ${index + 1} ---`);
      console.log(result);
    });
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    disconnect();
    process.exit(0);
  });
