const exportCSVLibs = require('../lib/export-csv');

class AggregateDataService {
  constructor(cursor) {
    this.cursor = cursor;
  }

  aggregateCursor(ns, pipeline, options = {}) {
    return this.cursor;
  }
}

class FindDataService {
  constructor(cursor) {
    this.cursor = cursor;
  }

  findCursor(ns, filter, options = {}) {
    return this.cursor;
  }
}

function getCursorNamespaceString(cursor) {
  return `${cursor.cursorNamespace.db}.${cursor.cursorNamespace.collection}`;
}

function exportCSV(cursor, output, options = {}) {
  if (cursor.pipeline) {
    return exportCSVLibs.exportCSVFromAggregation({
      ...options,
      ns: getCursorNamespaceString(cursor),
      dataService: new AggregateDataService(cursor),
      output,
      preferences: { getPreferences: () => ({}) },
      aggregation: {
        stages: cursor.pipeline,
      },
    });
  } else if (cursor.cursorFilter) {
    return exportCSVLibs.exportCSVFromQuery({
      ...options,
      ns: getCursorNamespaceString(cursor),
      dataService: new FindDataService(cursor),
      output,
      query: {
        filter: cursor.cursorFilter,
      },
    });
  }

  throw new Error('Invalid cursor');
}

module.exports = {
  exportCSV,
};
