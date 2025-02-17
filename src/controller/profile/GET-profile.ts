import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../middleware/verifyToken";


export const getProfile = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id
  console.log("profile", userId)    


  try {
    const profileData = await prisma.profile.findMany({
      where: {
       userId
      },
    });
    res.json(profileData);
  } catch (e) {
    console.log(e, "get explore error");
  }
};
