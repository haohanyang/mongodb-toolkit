const { MongoClient } = require('mongodb');

process.loadEnvFile();

const mongoClient = new MongoClient(process.env.MONGO_URI);

function disconnect() {
  mongoClient.close();
}

const testCollection = mongoClient.db('test').collection('testcoll');

module.exports = {
  testCollection,
  disconnect,
};
