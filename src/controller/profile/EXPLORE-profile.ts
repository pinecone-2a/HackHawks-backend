import { Request, Response } from "express";
import { prisma } from "../..";

export const profileExplore = async (req: Request, res: Response) => {
  const {search} = req.query
  
  try {
    const exploreData = await prisma.profile.findMany({
      where:{
        name:{
          contains: search as string,
          mode: "insensitive"
        }
      }
    })
    res.json(exploreData);
  } catch (e) {
    console.log(e, "get explore error");
  }
};
