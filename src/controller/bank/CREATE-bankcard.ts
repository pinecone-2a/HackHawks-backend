import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../middleware/verifyToken";


export const createBankCard = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id
  const body = req.body
  
  if (!userId) {
     res.status(400).json({ error: "Missing userId" });
     return
  }

  try {
    // 🔍 Check if a bank card already exists for this user
    const existingCard = await prisma.bankCard.findUnique({
      where: { userId},
    });

    if (existingCard) {
      res.status(400).json({ error: "User already has a bank card." });
      return
    }

    // ✅ Create the bank card
    const newCard = await prisma.bankCard.create({
      data: {
        ...body,
        userId
      }
    });

    res.status(201).json({ message: "success", card: newCard });
  } catch (e) {
    console.error("Error creating bank card:", e);
    res.status(500).json({ error: "Internal server error." });
  }
};
