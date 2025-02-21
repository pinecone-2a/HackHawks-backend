import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decode } from "punycode";
import { prisma } from "..";

export interface CustomRequest extends Request {
    user?: {id: string, name?: string},
   
 }

 export const verifyId = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
      const accessToken = req.cookies.Authorization;

      if (!accessToken) {
          return next(); // Do not send a response here
      }

      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { id: string };

      const profile = await prisma.profile.findUnique({
          where: { userId: decoded.id },
      });

      req.user = {
          id: decoded.id,
          name: profile?.name || "Guest",
      };

      next(); // Make sure next() is only called once
  } catch (e) {
      console.log("Token not found, donation as guest?");
      next(); // Do not send a response here, just proceed
  }
};


