import { Request, Response } from "express";
import { prisma } from "../..";

export const createBankCard = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const body = req.body;
  console.log(body);
  try {
    const newCard = await prisma.bankCard.create({
      data: body,
    });
    res.json({ message: "success" });
  } catch (e) {
    console.error(e, "aldaa");
  }
};
