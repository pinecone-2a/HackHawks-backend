import express, { Request, Response } from "express";
import { prisma } from "../..";

export const receivedDonation = async (req: Request, res: Response) => {
  // const { userId } = req.params;
  // try {
  //   if (userId) {
  //     const donation = await prisma.donation.findUnique({
  //       where: {
  //         userId,
  //       },
  //     });
  //     res.json(donation);
  //   }
  // } catch (e) {
  //   console.error(e, "aldaa");
  // }
}