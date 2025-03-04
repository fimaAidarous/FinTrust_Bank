import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const login = async (req,res,next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(errorHandler(404, "User not found!"));

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h" });

        const { password: pass, ...rest } = user._doc;

        res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
};