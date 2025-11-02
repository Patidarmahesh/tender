import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { userName, email, password, mobileNumber } = req.body;
    const chekRoleUserAndAdmin = email === "admin@gmail.com" ? "admin" : "user";
    if (!userName || !email || !password || !mobileNumber) {
      return res.status(401).json({
        message: "Something is missing, please check! required field",
        success: false,
      });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "Try different email, please!",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      role: chekRoleUserAndAdmin,
      password: hashedPassword,
      mobileNumber,
    });
    return res.status(200).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check! required field",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email is not regetser please, try different email!",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Password is wrong, please check password!",
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome ${user.userName}`,
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.log(error);
  }
};

export const googleLoginSuccess = async (req, res) => {
  try {
    const { email, displayName: userName } = req?.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        userName,
        email,
      });
      const token = await jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      user = {
        _id: user?._id,
        userName: user?.userName,
        email: user?.email,
        mobileNumber: user?.mobileNumber,
        role: user?.role,
      };

      return res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 1 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: `Welcome ${user.userName} google login successfully`,
          success: true,
          user,
          token,
        });
    } else {
      const token = await jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      user = {
        _id: user?._id,
        userName: user?.userName,
        email: user?.email,
        mobileNumber: user?.mobileNumber,
        role: user?.role,
      };

      return res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 1 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: `Welcome ${user.userName} google login successfully`,
          success: true,
          user,
          token,
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getloginUser = async (req, res) => {
  try {
    const { userId: _id } = req?.user;
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not login please login" });
    }
    return res
      .status(200)
      .json({ success: true, message: "user get sucessfully", user });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: "looged out sucessfully!",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({ email: { $ne: "admin@gmail.com" } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "get all user",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
