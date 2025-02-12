import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { createUser } from "../controller/user/CREATE-account";
import { verifyToken } from "../controller/authorization/verify";
import nodemailer from "nodemailer";
import { prisma } from "..";
import bcrypt from "bcrypt";
import { checkUsername } from "../controller/user/CHECK-username";
import { updatePassword } from "../controller/user/UPDATEPASS-user";
const jwt = require("jsonwebtoken");
require("dotenv").config();
export type CustomRequest = Request & {
  userId?: string;
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

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);
usersRouter.post(
  "/auth/dashboard/:userId",
  async (req: CustomRequest, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          recievedDonations: true,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
);

usersRouter.post("/auth/:username", checkUsername);

// password uptade hiih endpoint
usersRouter.patch("/update/:userId", updatePassword);

usersRouter.post(
  "/auth/reset/password",
  async (req: CustomRequest, res: Response) => {
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
          from: "Team HackHawks", // sender address
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
  "/auth/reset/change-password",
  async (req: CustomRequest, res: Response) => {
    const { otp, email, id, password } = req.body;
    // res.json({ email });
    try {
      const user = await prisma.otp.findUnique({
        where: {
          id,
        },
      });
      if (user) {
        if (user.opt === Number(otp) && user.email === email) {
          const hashedPass = await bcrypt.hash(
            password,
            Number(process.env.SALT)
          );
          await prisma.user.update({
            where: {
              email,
            },
            data: {
              password: hashedPass,
            },
          });
          res.json({
            message: "OTP_MATCHED",
            success: true,
            code: "PASS_CHANGED_SUCCESSFULLY",
          });
          await prisma.otp.delete({
            where: {
              id,
            },
          });
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

// Testing purposes

usersRouter.get("/auth/test/login", verifyToken);
