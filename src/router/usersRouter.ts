import { Request, Response, Router } from "express";
import {signInController } from "../controller/user/SIGNIN-controller";

import nodemailer from "nodemailer";
import { prisma } from "..";
import bcrypt from "bcrypt";

import { checkUsername } from "../controller/user/CHECK-username";
import {
  SendMail1,
  SendMail2,
  updatepassword,
} from "../controller/user/UPDATEPASS-user";
import { fetchAllUsersProfile } from "../controller/user/VIEW-profile";
import { signUpController } from "../controller/user/SIGNUP-controller";
import { getUsers } from "../controller/authentication/GetUser";



const jwt = require("jsonwebtoken");
require("dotenv").config();
export type CustomRequest = Request & {
  userId?: string;
  email?: string;
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const usersRouter = Router();

usersRouter.post("/sign-up", signUpController);
// login
usersRouter.post("/sign-in", signInController);


usersRouter.post("/:username", checkUsername);

// password uptade hiih endpoint - method 1 forgot password (hereglegch nevterj chadahgui bh ued)
usersRouter.post("/auth/reset/password", SendMail1);
usersRouter.post("/auth/reset/change-password");

// password update endpoint - method 2 update password in settings (hereglegch nevtereed passaa solihiig husvel)
usersRouter.put("/auth/reset/change-password",  updatepassword);
usersRouter.put("/auth/reset/password",  SendMail2);

// Testing purposes
usersRouter.get("/auth", );



usersRouter.get("/auth", fetchAllUsersProfile);

// Testing purposes
usersRouter.get("/auth/test/login", );

usersRouter.get("/users", getUsers)
