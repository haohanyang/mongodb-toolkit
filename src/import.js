'use strict';

const { createReadStream } = require('fs');
const importCSVLibs = require('../lib/import-csv');
const importJSONLibs = require('../lib/import-json');
const { guessFileType } = require('../lib/guess-filetype');
const { analyzeCSVFields } = require('../lib/analyze-csv-fields');

class ImportDataService {
  constructor(collection) {
    this.collection = collection;
  }

  insertOne(ns, doc, options) {
    return this.collection.insertOne(doc, options);
  }

  bulkWrite(ns, operations, options) {
    return this.collection.bulkWrite(operations, options);
  }
}

async function importCSVFromFile(collection, filePath, options = {}) {
  let guessFileTypeResult;

  if (options.delimiter && options.newline) {
    guessFileTypeResult = {
      type: 'csv',
      csvDelimiter: options.delimiter,
      newline: options.newline,
    };
  } else {
    guessFileTypeResult = await guessFileType({
      input: createReadStream(filePath),
    });

    if (guessFileTypeResult.type !== 'csv') {
      throw new Error(`Invalid csv file`);
    }
  }

  const analyzeCSVFieldsResult = await analyzeCSVFields({
    input: createReadStream(filePath),
    delimiter: guessFileTypeResult.csvDelimiter,
    newline: guessFileTypeResult.newline,
    ignoreEmptyStrings: options.ignoreEmptyStrings,
    abortSignal: options.abortSignal,
  });

  console.log(analyzeCSVFieldsResult.fields);

  return importCSVLibs.importCSV({
    ...options,
    input: createReadStream(filePath),
    ns: collection.namespace,
    dataService: new ImportDataService(collection),
    delimiter: options.delimiter ?? guessFileTypeResult.csvDelimiter,
    newline: options.newline ?? guessFileTypeResult.newline,
    fields: analyzeCSVFieldsResult.fields,
  });
}

async function importCSV(collection, input, options) {
  if (!options.fields) {
    throw new Error(`importCSV requires options.fields to be specified`);
  }

  return importCSVLibs.importCSV({
    ...options,
    input,
    ns: collection.namespace,
    dataService: new ImportDataService(collection),
    delimiter: options.delimiter ?? ',',
    newline: options.newline ?? '\n',
    fields: options.fields,
  });
}

function importJSON(collection, input, options = {}) {
  return importJSONLibs.importJSON({
    ...options,
    input,
    dataService: new ImportDataService(collection),
    ns: collection.namespace,
  });
}

module.exports = {
  importCSVFromFile,
  importCSV,
  importJSON,
};
