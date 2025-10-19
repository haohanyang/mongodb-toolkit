import { MongoClient } from 'mongodb';

process.loadEnvFile();

if (!process.env['MONGO_URI']) {
  console.log('MONGO_URI environment variable is not set');
  process.exit(1);
}

const mongoClient = new MongoClient(process.env['MONGO_URI']);

export function getMongoClient() {
  return mongoClient;
}

export function disconnect() {
  return mongoClient.close();
}
