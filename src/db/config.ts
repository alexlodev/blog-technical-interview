import mongoose from "mongoose";

const MongoDb =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/blog-technical-interview-db";

const connectDb = async () => {
  try {
    mongoose.connect(MongoDb, {});
  } catch (err) {
    process.exit(1);
  }
};

export default connectDb;
