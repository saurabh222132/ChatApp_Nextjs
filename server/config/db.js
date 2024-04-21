const mongoose = require("mongoose");
// import "dotenv/config";
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    let dbURI;
    if (process.env.NODE_ENV === "developement") {
      dbURI = process.env.DEVELOPEMENT_DB_URI;
    }
    if (process.env.NODE_ENV === "production") {
      dbURI = process.env.PRODUCTION_DB_URI;
    }
    mongoose.connect(dbURI).then((response) => {
      console.log("database connected");
    });
  } catch (err) {
    console.log("Error in DB connection", err);
  }
};

module.exports = { connectDB };
