const mongoose = require('mongoose');
require('dotenv').config();

const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
    
    // Basit bağlantı dizesi oluşturma
    const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}`;
    
    console.log('Trying to connect with connection string...');
    
    await mongoose.connect(connectionString, {
      dbName: MONGODB_DB
    });
    
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = initMongoConnection;