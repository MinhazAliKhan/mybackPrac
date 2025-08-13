const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error(
      "MongoDB connection string is missing in environment variables"
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Connection not successful:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
