import { Readable } from 'stream';
import { importJSON } from '../src';
import { getMongoClient, disconnect } from './shared'

const mongoClient = getMongoClient();

const coll = mongoClient
  .db('testdb')
  .collection('testcoll')

importJSON(
  coll,
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
