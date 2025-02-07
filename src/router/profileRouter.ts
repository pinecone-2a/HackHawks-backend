import { Request, Response, Router } from "express";
import { prisma } from "..";
// import { prisma } from "./bankCardRouter";

export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  try {
    const newProfile = await prisma.profile.create({
      data: body,
    });
    res.json({ message: "success" });
  } catch (e) {
    console.error(e, "aldaa 1");
  }
});
profileRouter.get("/", async (req: Request, res: Response) => {
  // const { userId } = req.params;
  try {
    const profile = await prisma.profile.findMany({
      include: {
        user: true,
      },
    });
    if (profile) {
      res.json({ userExists: true, profile });
      return;
    } else {
      res.json({ userExists: false });
    }
  } catch (e) {
    console.error(e, "aldaa 1");
  }
});
