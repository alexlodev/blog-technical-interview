/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import mongoose from "mongoose";

/* ––
 * –––– Connection to db
 * –––––––––––––––––––––––––––––––––– */
const MongoDb = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    if (MongoDb) {
      mongoose.connect(MongoDb);
    }
  } catch (err) {
    process.exit(1);
  }
};

export default connectDb;
