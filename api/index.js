import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";  
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRoute.js';
import accountRoute from './routes/accountRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import transferRoute from './routes/transferRoute.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
     console.log('Connected to MONGODB');
  })
  .catch((err) => {
     console.log(err);
  });

const app = express();


app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,  
}));
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/transfers', transferRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
