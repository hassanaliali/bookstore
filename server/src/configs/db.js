const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    const uri = process.env.MONGO_URL; // MongoDB connection URI
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db(); // Set the database connection
        console.log("Connected to MongoDB");
        cb(); // Call the callback without an error
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        cb(err); // Call the callback with the error
      });
  },
  getDb: () => dbConnection, // Return the database connection
};
