const { MongoClient } = require('mongodb');

require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

function disconnect() {
  mongoClient.close();
}

const aggregationCursor = mongoClient
  .db('sample_airbnb')
  .collection('listingsAndReviews')
  .aggregate([{ $limit: 10 }, { $project: { listing_url: 1 } }]);

const findCursor = mongoClient
  .db('sample_airbnb')
  .collection('listingsAndReviews')
  .find({}, { limit: 10, projection: { listing_url: 1 } });

module.exports = {
  findCursor,
  aggregationCursor,
  disconnect,
};
