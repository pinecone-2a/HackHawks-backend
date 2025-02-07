import { Request, Response } from "express";
import { prisma } from "../..";

export const profileExplore = async (req: Request, res: Response) => {
  try {
    const exploreData = await prisma.profile.findMany();
    res.json(exploreData);
  } catch (e) {
    console.log(e, "get explore error");
  }
};
