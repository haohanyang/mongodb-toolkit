import { createWriteStream } from 'fs';
import { exportJSON } from '../src';
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
  exportJSON(findCursor, createWriteStream('find-cursor.json'), {
    variant: 'relaxed',
  }),
  exportJSON(aggregationCursor, createWriteStream('aggregation-cursor.json'), {
    progressCallback: (idx) => {
      console.log(`Exported ${idx} documents so far...`);
    }
  }),
])
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    disconnect();
    process.exit(0);
  });
