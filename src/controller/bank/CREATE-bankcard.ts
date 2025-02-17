import { Request, Response } from "express";
import { prisma } from "../..";


export const createBankCard = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.userId) {
     res.status(400).json({ error: "Missing userId in request body" });
     return
  }

  try {
    // 🔍 Check if a bank card already exists for this user
    const existingCard = await prisma.bankCard.findUnique({
      where: { userId: body.userId },
    });

    if (existingCard) {
      res.status(400).json({ error: "User already has a bank card." });
      return
    }

    // ✅ Create the bank card
    const newCard = await prisma.bankCard.create({
      data: body,
    });

    res.status(201).json({ message: "success", card: newCard });
  } catch (e) {
    console.error("Error creating bank card:", e);
    res.status(500).json({ error: "Internal server error." });
  }
};
