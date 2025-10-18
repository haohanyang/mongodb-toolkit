const { createWriteStream } = require('fs');
const { exportCSV } = require('../src');
const { findCursor, aggregationCursor, disconnect } = require('./cursors');

Promise.all([
  exportCSV(findCursor, createWriteStream('find-cursor.csv'), {
    delimiter: '\t',
  }),
  exportCSV(aggregationCursor, createWriteStream('aggregation-cursor.csv'), {
    progressCallback: (idx, phase) => {
      console.log(phase, idx);
    },
  }),
])
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    disconnect();
    process.exit(0);
  });
