import { Request, Response } from "express";
import { prisma } from "../..";

export const fetchBankCard = (req: Request, res: Response) => {
  // const body = req.body
  try {
    const bankCards = prisma.bankCard.findMany();
    res.json(bankCards);
  } catch (e) {
    console.error(e, "aldaa");
  }
};
