const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://skv222132:Saurabh222132@cluster1.bdobp9b.mongodb.net/chatapp",
        { serverSelectionTimeoutMS: 30000 }
      )
      .then((response) => {
        console.log("database connected");
      });
  } catch (err) {
    console.log("Error in DB connection", err);
  }
};

module.exports = { connectDB };
