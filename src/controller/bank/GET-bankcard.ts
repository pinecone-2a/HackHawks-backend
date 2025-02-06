import { Request, Response } from "express";
import { prisma } from "../..";

export const fetchBankCard = async (req: Request, res: Response) => {
  try {
    const bankCard = await prisma.bankCard.findMany();
    res.send("hello");
  } catch (e) {
    console.log(e, "fetch error");
  }
};
