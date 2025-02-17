import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../middleware/verifyToken";

export const EditProfile = async (req: CustomRequest, res: Response) => {
  const body = req.body;
  const userId = req.user?.id;
  console.log("from cover", userId);
  try {
    if (body.id !== userId) {
      res.json({ success: false, message: "ID didnt match!" });
      return;
    }
    const editProfile = await prisma.profile.update({
      where: {
        userId,
      },
      data: body,
    });
    res.json({ success: true, message: "success" });
  } catch (e) {
    console.error(e, "aldaa");
    res.json({ success: false });
  }
};

export const updateCover = async (req: CustomRequest, res: Response) => {
  const { image } = req.body;
  const userId = req.user?.id;
  try {
    const user = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    if (user) {
      const change = await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          backgroundImage: image,
        },
      });
      res.json({ message: "success" });
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
};
