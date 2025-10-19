import { createWriteStream } from 'fs';
import { exportCSV } from '../src';
import { getMongoClient, disconnect } from './shared';

const mongoClient = getMongoClient();

const coll = mongoClient
  .db('sample_airbnb')
  .collection('listingsAndReviews')

const aggregationCursor = coll
  .aggregate([{ $limit: 10 }, { $project: { listing_url: 1 } }]);

const findCursor = coll
  .find({}, { limit: 10, projection: { listing_url: 1 } });


Promise.all([
  exportCSV(findCursor, createWriteStream('find-cursor.csv'), {
    delimiter: ';',
  }),
  exportCSV(aggregationCursor, createWriteStream('aggregation-cursor.csv'), {
    progressCallback: (idx, phase) => {
      console.log(`Processed ${idx} documents so far during ${phase} phase...`);
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
