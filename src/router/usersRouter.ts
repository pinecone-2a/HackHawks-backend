import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { createUser } from "../controller/user/CREATE-account";
import { generateToken, verifyToken } from "../controller/authorization/verify";
import { checkUsername } from "../controller/user/CHECK-username";
import nodemailer from "nodemailer";
import { prisma } from "..";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});
export const usersRouter = Router();

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);

usersRouter.post("/auth/:username", checkUsername);

// Testing purposes
usersRouter.post(
  "/auth/test/reset-password",
  async (req: Request, res: Response) => {
    const { email } = req.body;
    // res.json({ email });
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        const otp = Math.floor(Math.random() * 899999999 + 100000000);

        const newOtp = await prisma.otp.create({
          data: {
            email,
            opt: otp,
          },
        });
        res.json({ newOtp, success: true });
        return;
      }
      res.json({ success: false });
      return;
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);
usersRouter.post(
  "/auth/test/verify-otp",
  async (req: Request, res: Response) => {
    const { email } = req.body;
    // res.json({ email });
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        res.json({ user, success: true });
        return;
      }
      res.json({ success: false });
      return;
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

usersRouter.post("/auth/test/login", generateToken);

usersRouter.get("/auth/test/login", verifyToken);
