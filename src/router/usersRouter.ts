import {  Router } from "express";
import {signInController } from "../controller/user/SIGNIN-controller";
import { checkUsername } from "../controller/user/CHECK-username";
import { signUpController } from "../controller/user/SIGNUP-controller";
import { forgotPassword } from "../controller/user/REQUEST-otp";
import { verifyOTP } from "../controller/user/VERIFY-otp";
import { verifyAuth } from "../controller/user/VERIFY-auth";
import { logOutUser } from "../controller/user/LOGOUT-user";


require("dotenv").config();

export const usersRouter = Router();

usersRouter.post("/sign-up", signUpController);

usersRouter.post("/sign-in", signInController);

usersRouter.post("/:username", checkUsername);

usersRouter.post("/reset/password", forgotPassword); 

// otp verify bolon shine password awah endpoint
usersRouter.post("/reset/change-password", verifyOTP);

// navigation logged in or not shalgah endpoint
usersRouter.get("/verify", verifyAuth);

usersRouter.post("/user/logout", logOutUser)

// password update endpoint - method 2 update password in settings (hereglegch nevtereed passaa solihiig husvel)
// usersRouter.put("/auth/reset/change-password",  updatepassword);
// usersRouter.put("/auth/reset/password",  SendMail2);

// Testing purposes



