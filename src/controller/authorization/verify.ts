import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ajillaj bga
export const verifyToken = async (req: Request, res: Response) => {
  const accessToken = req.cookies.Authorization;

  try {
    if (accessToken) {
      const verifyToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
      if (verifyToken) {
        res.json({
          success: true,
          message: "success",
          data: { user: verifyToken },
        });
        console.log(verifyToken);
        return;
      }
      res.json({
        success: false,
        message: "invalid token",
        code: "INVALID_TOKEN",
      });
      return;
    }
    res.json({
      success: false,
      message: "no token provided",
      code: "NO_TOKEN_PROVIDED",
    });
    return;
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: "JWT expired", code: "JWT_EXPIRED" });
  }
};
