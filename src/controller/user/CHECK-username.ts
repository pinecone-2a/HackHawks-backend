import { Request, Response } from "express";
import { prisma } from "../..";
import bcrypt from "bcrypt";
export const createUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      const checkingpass = await bcrypt.compare(
        password,
        existingUser.password
      );
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
    const rounds = 10;
    const encryptedPass = await bcrypt.hash(password, rounds);
    const newUser = await prisma.user.create({
      data: { email, password: encryptedPass, username },
    });
    res.json({ message: "success", id: newUser.id });
  } catch (e) {
    console.error(e, "aldaa");
  }
};
