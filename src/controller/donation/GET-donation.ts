import express, { Request, Response } from "express";
import { prisma } from "../..";
import { profile } from "console";


export const fetchDonation = async (req: Request, res: Response) => {
  const {id} = req.params; 
  console.log(id)

  
  try {
    const donation = await prisma.donation.findMany({
      where: {
            recipentId:id
      },include:{
        donor:{
            select:{
                profile:true
            }
        }
      }

    });
    res.json(donation)
  } catch (e) {
    console.error(e, "received donation error");
  }
};
