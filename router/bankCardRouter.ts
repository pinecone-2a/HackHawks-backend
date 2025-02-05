import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

export const bankCardRouter = Router();
export const prisma = new PrismaClient();
bankCardRouter.post("/addnew", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  try {
    const newCard = await prisma.bankCard.create({
      data: body,
    });
    res.json(newCard);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
bankCardRouter.get("/", (req: Request, res: Response) => {
  // const body = req.body
  try {
    const bankCards = prisma.bankCard.findMany();
    res.json(bankCards);
  } catch (e) {
    console.error(e, "aldaa");
  }
});
