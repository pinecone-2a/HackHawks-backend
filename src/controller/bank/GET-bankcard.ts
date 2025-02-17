import { Request, Response } from "express";
import { prisma } from "../..";


export const fetchBankCard = async (req:Request, res: Response) => {
  try {
    const bankCards = await prisma.bankCard.findMany();
    res.json(bankCards);
  } catch (e) {
    console.error(e, "aldaa");
  }
};
