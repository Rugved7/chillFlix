import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/Database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

connectToDB(); // Databse connection

dotenv.config({
  path: ".env",
});

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is up on ${process.env.PORT}`);
});
