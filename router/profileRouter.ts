import { Request, Response, Router } from "express";
import { prisma } from "./bankCardRouter";

export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newProfile = await prisma.profile.create({
      data: body,
    });
    res.json({ message: "success" });
  } catch (e) {
    console.error(e, "aldaa 1");
  }
});
