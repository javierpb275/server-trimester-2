const mongoose = require("mongoose");
const config = require("../config/config");

const startMongooseConnection = async () => {
  try {
    const db = await mongoose.connect(config.DB.URI);
    console.log(`Connected to database successfully!`);
  } catch (error) {
    console.log(`ERROR! Unable to connect to database!`);
  }
};

module.exports = {
  startMongooseConnection,
};
