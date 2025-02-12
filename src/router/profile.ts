import { Request, Response, Router } from "express";
import { profileExplore } from "../controller/profile/EXPLORE-profile";
import { editProfile } from "../controller/profile/EDIT-profile";
import { prisma } from "..";
import { verifyToken } from "../controller/authorization/verify";
import { CustomRequest } from "./usersRouter";

export const profileRouter = Router();

profileRouter.get("/explore", profileExplore);

// profileRouter.put("/:userId", editProfile);
profileRouter.put(
  "/updateCover/:userId",
  async (req: Request, res: Response) => {
    const { image } = req.body;
    const { userId } = req.params;
    console.log("userId", userId);
    console.log("image", image);
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
        console.log(change);
      }
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);

profileRouter.put(
  `/update`,
  verifyToken,
  async (req: CustomRequest, res: Response) => {
    const body = req.body;
    const userId = req.userId;
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
    }
  }
);
