import { Request, Response } from "express";
import { prisma } from "../.."; // Adjust path as needed

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { userId, name, about, avatarImage, socialMediaURL } = req.body;


    if (!userId || !name || !about || !avatarImage || !socialMediaURL) {
     res.status(400).json({ error: "Хоосон талбар байна" });
     return
    }

    const profile = await prisma.profile.create({
      data: { userId, name, about, avatarImage, socialMediaURL },
    });

    res.status(201).json({ message: "success", profile });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Серверийн алдаа" });
  }
};
