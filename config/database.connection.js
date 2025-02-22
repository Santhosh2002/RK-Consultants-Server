const mongoose = require("mongoose");
const logger = require("../utils/logger.utils"); // Import Winston logger

const connectDatabase = async (DATABASE_URL, DATABASE_NAME) => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: DATABASE_NAME,
    });
    logger.info(`Database connected successfully to ${DATABASE_NAME}`);
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
  }
};

// Enable query logging
mongoose.set("debug", (collectionName, method, query, doc) => {
  logger.info(
    `DB CALL: ${collectionName}.${method} - Query: ${JSON.stringify(
      query
    )} - Data: ${JSON.stringify(doc)}`
  );
});

module.exports = connectDatabase;
