import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async () => {
  try {
    let conn = await mongoose.connect(process.env.DATABASE_CONNECTION_URI + "");
    console.log(`Connected to Database: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDatabase;
