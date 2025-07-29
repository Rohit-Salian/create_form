import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan);
  } catch (err) {
    console.error("Db Error".bgRed, err);
  }
};

export default connectDB;
