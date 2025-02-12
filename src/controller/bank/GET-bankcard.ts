import { Request, Response } from "express";
import { prisma } from "../..";

export const fetchBankCard = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const bankCards = await prisma.bankCard.findMany({
      where: {
        userId,
      },
    });
    res.json(bankCards);
  } catch (e) {
    console.error(e, "aldaa");
  }
};
