const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Successful ...${mongoose.connection.host}`.bgMagenta.white);
  } catch (exception) {
    console.log(`MONGO Connect Error ... ${exception}`.bgRed.white);
    console.error(exception.message);
  }
};

module.exports = connectDB;