import { Request, Response, Router } from "express";
import { prisma } from "./bankCardRouter";
import bcrypt from "bcrypt";

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
});
// login
usersRouter.post("/auth/sign-in", async (req: Request, res: Response) => {
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
});
usersRouter.post("/auth/:username", async (req: Request, res: Response) => {
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
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
});
