import { Request, Response, Router } from "express";

import bcrypt from "bcrypt";
import { prisma } from "..";


export const usersRouter = Router();

usersRouter.post("/addnew", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      res.json({ message: "user already exist" });
      return;
    }
    const rounds = 10;
    const encryptedPass = await bcrypt.hash(password, rounds);
    await prisma.user.create({
      data: { email, password: encryptedPass, username },
    });
    res.json({ message: "success" });
  } catch (e) {
    console.error(e, "aldaa");
  }
});
// login
usersRouter.get("/", async (req: Request, res: Response) => {
  // const { email, password, username } = req.body;
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
