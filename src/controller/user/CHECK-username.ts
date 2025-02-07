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
      res.json({ message: "user already exist", id: existingUser.id });
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
