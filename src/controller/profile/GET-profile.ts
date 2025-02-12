import { Request, Response } from "express";
import { prisma } from "../..";

export const fetchProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const exploreData = await prisma.profile.findMany({
      where: {
        userId,
      },
    });
    res.json(exploreData);
  } catch (e) {
    console.log(e, "get explore error");
  }
};
