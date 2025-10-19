import path from 'path';
import { createReadStream } from 'fs';
import { importCSVFromFile, importCSV } from '../src';
import { getMongoClient, disconnect } from './shared';

const mongoClient = getMongoClient();

const csvFilePath = path.resolve(__dirname, '..', 'examples', 'example.csv');

const coll = mongoClient
  .db('testdb')
  .collection('testcoll')


Promise.all([
  importCSVFromFile(coll, csvFilePath),
  importCSV(coll, createReadStream(csvFilePath), {
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
