import express from "express";
import {
  ForgetPassword,
  loginUser,
  registerUser,
} from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forget-password", ForgetPassword);

export default userRouter;
