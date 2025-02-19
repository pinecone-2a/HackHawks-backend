import { Request, Response } from "express";
import { prisma } from "../.."; // Adjust path as needed
import { CustomRequest } from "../../middleware/verifyToken";

export const createProfile = async (req: CustomRequest, res: Response) => {
  try {
    const { name, about, avatarImage, socialMediaURL } = req.body;
    const userId = req.user?.id; 
    if ( !name || !about || !avatarImage || !socialMediaURL) {
       res.status(400).json({ error: "Хоосон талбар байна" })
       return;
    }

    if (!userId) {
      res.status(400).json({ error: "User ID is missing" });
      return;
    }

    const profile = await prisma.profile.create({
      data: {  name, about, avatarImage, socialMediaURL, userId }, 
    });

    res.status(201).json({ message: "success", profile });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Серверийн алдаа" });
  }
};
