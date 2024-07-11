require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
  const MongoURL = process.env.MongoURL;
  const DB = process.env.DB;
  
  // Ensure the URL is correctly formatted
  const connectionString = `${MongoURL}/${DB}`;
  console.log('Attempting to connect to MongoDB:', connectionString);
  
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('🚀 DataBase Connected'))
    .catch((reason) => {
      console.log(`💩 Unable to connect to DataBase \n${reason}`);
    });
};

module.exports = connectDB;
