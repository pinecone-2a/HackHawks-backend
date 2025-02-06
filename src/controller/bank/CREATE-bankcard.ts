import { prisma } from "../..";
import { Request, Response, Router } from "express";

export const createBankCard = async (req: Request, res: Response) => {
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
};
