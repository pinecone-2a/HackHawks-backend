import { Request, Response, Router } from "express";
import { prisma } from "../..";
import bcrypt from "bcrypt";
import { CustomRequest } from "../../router/usersRouter";
const jwt = require("jsonwebtoken");
export const loginUser = async (req: CustomRequest, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      const pass = await bcrypt.compare(password, existingUser.password);
      if (pass) {
        const existingProfile = await prisma.profile.findFirst({
          where: { userId: existingUser.id },
        });
        if (existingProfile) {
          const accessToken = jwt.sign(existingUser, process.env.ACCESS_TOKEN, {
            expiresIn: "5m",
          });
          res.cookie("Authorization", accessToken, {
            maxAge: 300000,
            sameSite: "strict",
          });
          res.json({
            message: "Welcome back",
            success: true,
            profileSetup: true,
            data: { id: existingUser.id },
          });
          console.log(accessToken);
          return;
        }
        const accessToken = jwt.sign(existingUser, process.env.ACCESS_TOKEN, {
          expiresIn: "15s",
        });
        res.cookie("Authorization", accessToken, {
          maxAge: 30000,
          httpOnly: true,
          secure: false,
          sameSite: "none",
        });
        res.json({
          message: "Welcome back",

          success: true,
          data: { id: existingUser.id },
        });

        return;
      } else {
        res.json({
          message: "WRONG_PASSWORD",
          success: false,
          data: {},
        });
      }
    } else {
      res.json({ message: "NOT_REGISTERED", success: false, data: {} });
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
};
