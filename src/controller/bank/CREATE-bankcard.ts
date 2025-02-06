import { Request, Response } from "express";
import { prisma } from "../..";



export const createBankCard = async (req: Request, res: Response) => {
    try {
        const bankAdd = await prisma.bankCard.create({
            data: {
                cardNumber: "123230546",
                country: "japanese",
                firstName: "John",
                lastName: "Doe",
                expiryDate: new Date("2025-12-31"),
                userId: "some-user-id",
            }
        });
      
        res.status(201).json(bankAdd);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the bank card." });
    }
};