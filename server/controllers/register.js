// Actual Logic of all the API routes
import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User Already Exists",
        success: false,
      });
    }

    const hashedpassword = await bcryptjs.hash(password, 12);

    // If no user founds
    await User.create({
      name,
      email,
      password: hashedpassword,
    });

    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
