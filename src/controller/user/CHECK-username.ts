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
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
};
