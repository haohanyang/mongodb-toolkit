'use strict';

const schemaAnalysisLib = require('../lib/schema-analysis');

class SampleDataService {
  constructor(cursor) {
    this.cursor = cursor;
  }

  sampleCursor(ns, args, options, executionOptions) {
    return this.cursor;
  }
}

function getCursorNamespaceString(cursor) {
  return `${cursor.cursorNamespace.db}.${cursor.cursorNamespace.collection}`;
}

function analyzeSchema(cursor, options = {}) {
  const noop = () => {};
  const noopLogger = {
    log: {
      write: () => true,
      info: noop,
      warn: noop,
      error: noop,
      fatal: noop,
      debug: noop,
    },
    debug: noop,
    mongoLogId: () => '',
  };

  return schemaAnalysisLib.analyzeSchema(
    new SampleDataService(cursor),
    options.abortSignal ? options.abortSignal : new AbortController().signal,
    getCursorNamespaceString(cursor),
    {}, // query
    {}, // aggregateOptions,
    noopLogger, // logger
    { getPreferences: () => ({}) }, // preferences
  );
}

module.exports = {
  analyzeSchema,
};
