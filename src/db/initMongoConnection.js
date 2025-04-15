const mongoose = require('mongoose');
require('dotenv').config();

const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
    // URL içinde zaten mongodb+srv:// protokolü varsa onu siliyoruz
    const cleanUrl = MONGODB_URL.replace(/^mongodb\+srv:\/\//, '');
    
    // Tam bağlantı dizesini oluşturuyoruz
    const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${cleanUrl}/${MONGODB_DB}?retryWrites=true&w=majority`;
    
    console.log('Trying to connect with:', connectionString.replace(/:([^:@]+)@/, ':****@')); // Şifreyi gizleyerek
    
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = initMongoConnection;