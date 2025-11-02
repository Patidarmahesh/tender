import express from "express";
import {
  getAllUser,
  getloginUser,
  googleLoginSuccess,
  login,
  logoutUser,
  register,
} from "../controllers/userController.js";
import userAuth from "../middleware/Authanticated.js";

const userRoute = express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/login-user").get(userAuth, getloginUser);
userRoute.route("/logout").get(logoutUser);
userRoute.route("/google").post(googleLoginSuccess);
userRoute.route("/get-all-user").get(userAuth,getAllUser);

export default userRoute;
