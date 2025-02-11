import { Request, Response, Router } from "express";
import { prisma } from "../..";
export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (username.length < 6) {
    res.json({ message: "username is too short", no: "no" });
    return;
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (existingUser) {
      res.json({ message: "username is taken", no: "no" });
    } else {
      res.json({ message: "username is available", yes: "yes" });
      const checkingpass = await bcrypt.compare(password, existingUser.password);
      if (!checkingpass) {
        res.json({ message: "user exists, but pass didn't match" });
        return;
      }
      if (email) {
        const existingProfile = await prisma.profile.findFirst({
          where: { userId: existingUser.id },
        });
        if (existingProfile) {
          res.json({
            message: "you have a profile setup",
            hasProfile: true,
            id: existingUser.id,
          });
          return;
        }
      }
      res.json({ message: "welcome back", id: existingUser.id });
      return;
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
};
