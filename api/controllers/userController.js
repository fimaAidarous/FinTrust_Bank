import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = (req,res) => {
    res.json({
        message:"API route is working don't worry",
    });
};


export const createUser = async (req,res,next) => {
    const { email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = User({ email, password: hashedPassword });

    try {
      await newUser.save();
      res.status(201).json("User created succefully!");  
    } catch (error) {
       next(error);
    }
};
