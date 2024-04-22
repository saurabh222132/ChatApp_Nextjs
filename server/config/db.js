const mongoose = require("mongoose");
// import "dotenv/config";
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.PRODUCTION_DB_URI).then((response) => {
      console.log("database connected");
    });
  } catch (err) {
    console.log("Error in DB connection", err);
  }
};

module.exports = { connectDB };
