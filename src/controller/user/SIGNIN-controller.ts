import { Request, Response, Router } from "express";
import { prisma } from "../..";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

const generateToken = (user: any, secret: string, expiresIn: string) => {
  return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (!existingUser) {
      res.status(400).json({ message: "NOT_REGISTERED", success: false });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "WRONG_PASSWORD", success: false });
      return;
    }

    const existingProfile = await prisma.profile.findFirst({
      where: { userId: existingUser.id },
    });

    const accessToken = generateToken(existingUser, process.env.ACCESS_TOKEN_SECRET!, "30m");
    const refreshToken = generateToken(existingUser, process.env.REFRESH_TOKEN_SECRET!, "2h");

    res.json({
      message: "Welcome back",
      success: true,
      profileSetup: !!existingProfile,
      data: { id: existingUser.id },
      result: {
        accessToken,
        refreshToken,
      },
    });
    return;
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "INTERNAL_SERVER_ERROR", success: false });
    return;
  }
};
