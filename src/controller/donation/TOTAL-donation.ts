import express, { Request, Response } from "express";
import { prisma } from "../..";

export const totalDonation =  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      if (userId) {
        const donation = await prisma.donation.findMany({
          where: {
            userId,
          },
        });
        res.json(donation);
      }
    } catch (e) {
      console.error(e, "total donation error");
    }
  }