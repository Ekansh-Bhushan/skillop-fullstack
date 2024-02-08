require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
  const MongoURL = process.env.MongoURL;
  const DB = process.env.DB;
  mongoose
    .connect(`${MongoURL}/${DB}`)
    .then(() => console.log('🚀 DataBase Connected'))
    .catch((reason) => {
      console.log(`💩 Unable to connect to DataBase \n${reason}`);
    });
};

module.exports = connectDB;
