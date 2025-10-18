const { createWriteStream } = require('fs');
const { exportJSON } = require('../src');
const { findCursor, aggregationCursor } = require('./cursors');

Promise.all([
  exportJSON(findCursor, createWriteStream('find-cursor.json'), {
    variant: 'relaxed',
  }),
  exportJSON(aggregationCursor, createWriteStream('aggregation-cursor.json'), {
    progressCallback: (idx) => {
      console.log(idx, 'doc');
    },
  }),
])
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    process.exit(0);
  });
