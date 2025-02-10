import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const generateToken = async (req: Request, res: Response) => {
  const user = req.body;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "15s",
  });
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15000,
  });
  res.json({ token: accessToken });
};
export const verifyToken = async (req: Request, res: Response) => {
  try {
    const user = req.get("session");
    const accessToken = jwt.verify(user, process.env.ACCESS_TOKEN);
    res.json({ message: accessToken });
  } catch (e) {
    console.error("aldaa", e);
  }
};
