import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../router/usersRouter";

export const editProfile = async (req: CustomRequest, res: Response) => {
  const { avatarImage, name, about, socialMediaURL } = req.body;
  const { userId } = req.params;
  console.log(userId);

  const updatedUser = await prisma.profile.update({
    where: {
      userId,
    },
    data: {
      avatarImage,
      name,
      about,
      socialMediaURL,
    },
  });
  res.json(updatedUser);
};
