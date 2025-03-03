import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    console.log('Connected to MONGODB');
 })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use(( err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal Server Error";
    return res.status(statusCode).json ({
        success: false,
        statusCode,
        message,
    });
});
