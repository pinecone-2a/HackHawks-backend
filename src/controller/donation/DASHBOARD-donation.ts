import express, { Request, Response } from "express";
import { prisma } from "../..";
import { profile } from "console";
import { CustomRequest } from "../../middleware/verifyToken";

export const receivedDonation = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id
  const amount = req.query.amount ? Number(req.query.amount) : 0
  const days = req.query.days ? Number(req.query.days) : 90
  const lte = new Date();
  const gte = new Date(lte);

  gte.setDate(lte.getDate() - Number(days));  
  
  try {
    const donation = await prisma.donation.findMany({
      where: {
        AND: [{ recipentId: userId }, amount ? { amount: Number(amount) } : {}],
      
      },
        include: {
         recipent:{
          select:{
            profile:true
          }
         },
         donor:{
          select:{
            profile:true
          }
         }
        }
    });
 
    // aggregate ashiglah
    const totalEarnings = await prisma.donation.aggregate({
      where: {
        recipentId:userId,
        createdAt:{gte,lte},
      },
      _sum: {
        amount: true,
      },
    });

    res.json({ donation, totalEarnings, success:true });
  } catch (e) {
    console.error(e, "received donation error");
  }
};
