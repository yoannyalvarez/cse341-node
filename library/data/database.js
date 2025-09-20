const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database;

const initDatabase = async () => {
  if (database) return database;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  "const dbName = process.env.DB_NAME || undefined;"
  database = client.db();
  return database;
};

const getDatabase = async () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDatabase, getDatabase };