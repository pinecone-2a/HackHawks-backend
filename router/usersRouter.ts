import { Request, Response, Router } from "express";
import { prisma } from "./bankCardRouter";

export const usersRouter = Router();

usersRouter.post("/addnew", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, password, username },
    });
    res.json(newUser);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
