import { Request, Response, Router } from "express";
import { prisma } from "../..";
import bcrypt from "bcrypt";
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser && password) {
      const pass = await bcrypt.compare(password, existingUser.password);
      if (pass) {
        res.json({ message: "password matches", id: existingUser.id });
      } else {
        res.json({ message: "password didn't match" });
      }
    } else {
      res.json({ message: "not registered" });
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
};
