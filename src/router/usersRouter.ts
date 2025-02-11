import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { createUser } from "../controller/user/CREATE-account";
import { generateToken, verifyToken } from "../controller/authorization/verify";
import nodemailer from "nodemailer";
import { prisma } from "..";
import bcrypt from "bcrypt";
import { checkUsername } from "../controller/user/CHECK-username";
import { updatePassword } from "../controller/user/UPDATEPASS-user";



const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const usersRouter = Router();

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);

usersRouter.post("/auth/:username", checkUsername);

// password uptade hiih endpoint
usersRouter.patch("/update/:userId", updatePassword)

usersRouter.post(
  "/auth/reset/password",
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

        await transporter.sendMail({
          from: "hackhawks@zohomail.com", // sender address
          to: email, // list of receivers
          subject: "OTP code for reset password", // Subject line
          text: "Buy me a coffee / Team HackHawks", // plain text body
          html: `<b>Hello! ${user.username}.</b><p> Here is the OneTimePassword: ${otp}</p>`, // html body
        });
        const newOtp = await prisma.otp.create({
          data: {
            email,
            opt: otp,
          },
        });
        res.json({ success: true, id: newOtp.id });
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
  "/auth/reset/verify-otp",
  async (req: Request, res: Response) => {
    const { otp, email, id } = req.body;
    // res.json({ email });
    try {
      const user = await prisma.otp.findUnique({
        where: {
          id,
        },
      });
      if (user) {
        if (user.opt === Number(otp) && user.email === email) {
          res.json({ message: "OTP_MATCHED", success: true });
          return;
        }
        res.json({ success: false, message: "OTP_NOT_MATCHED" });
        return;
      }
      res.json({ success: false, message: "USER_NOT_FOUND" });
      return;
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);
usersRouter.post(
  "/auth/reset/change-password",
  async (req: Request, res: Response) => {
    const { password, email } = req.body;
    // res.json({ email });
    try {
      const hashedPass = await bcrypt.hash(password, Number(process.env.SALT));
      const user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPass,
        },
      });
      if (user) {
        res.json({
          message: "amjilttai",
          code: "PASS_CHANGED_SUCCESSFULLY",
        });
      }
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

// Testing purposes

usersRouter.post("/auth/test/login", generateToken);

usersRouter.get("/auth/test/login", verifyToken);
