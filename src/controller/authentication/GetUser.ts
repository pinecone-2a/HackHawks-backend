import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../..";

export const getUsers = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;


  if (typeof accessToken !== "string") {
     res.status(401).json({ error: "Unauthorized: Invalid token format" });
     return
  }

  try {
    // Verify the access token
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    console.log("Token payload:", payload);

    // Fetch all users from the database
    const users = await prisma.profile.findMany();
    res.json(users);
    return
  } catch (error) {
    console.error("Error:", error); 
    

    // Handle JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Expired or invalid token" });
      return
    }

    // Handle other errors
     res.status(500).json({ error: "Internal server error" });
     return
  }
};