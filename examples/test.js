const { createWriteStream } = require('fs');
const { MongoClient } = require('mongodb');
const { exportCSV } = require('../src');
require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

const aggregationCursor = mongoClient
  .db('sample_airbnb')
  .collection('listingsAndReviews')
  .aggregate([{ $limit: 10 }, { $project: { listing_url: 1 } }]);

const findCursor = mongoClient
  .db('sample_airbnb')
  .collection('listingsAndReviews')
  .find({}, { limit: 10, projection: { listing_url: 1 } });

Promise.all([
  exportCSV(findCursor, createWriteStream('find-cursor.csv'), {
    delimiter: '\t',
  }),
  exportCSV(aggregationCursor, createWriteStream('aggregation-cursor.csv')),
])
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoClient.close();
    process.exit(0);
  });
