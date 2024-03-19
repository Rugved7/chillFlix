import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // if we are allowing to login the user
    const token = await jwt.sign(
      { userId: user._id },
      "kjsdfkjsgdufwr848ylkjdgjfbg",
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
