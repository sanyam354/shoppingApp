const mongoose = require("mongoose");
require("colors");

const dotenv = require("dotenv");

dotenv.config();

// connecting with the mongodb
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb Connected ${conn.connection.host}`.underline.yellow);
  } catch (error) {
    console.log(`Error:${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDb;
