import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // No need to specify path, as .env is in the same directory

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDB;
