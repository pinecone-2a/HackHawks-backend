import { Request, Response, Router } from "express";
import { prisma } from "../..";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
export const loginUser = async (req: Request, res: Response) => {
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
          res.json({
            message: "Welcome back",
            success: true,
            profileSetup: true,
            data: { id: existingUser.id },
          });
          return;
        }
        res.json({
          message: "Welcome back",
          success: true,
          data: { id: existingUser.id },
        });
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
