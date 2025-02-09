import express, { Request, Response } from "express";
import { prisma } from "../..";

export const fetchAllDonation =  async (req: Request, res: Response) => {
    try {
        const donation = await prisma.donation.findMany({
          include: {
            donor: {
              include:{
                profile: true
              }
            }

          },
        });
        res.json(donation);
    
    } catch (e) {
      console.error(e, "total donation error");
    }
  }