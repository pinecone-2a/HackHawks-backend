import { prisma } from "../..";
import express, { Request, Response } from "express";
import { CustomRequest } from "../../middleware/verifyToken";

export const createDonation = async (req: CustomRequest, res: Response) => {
  const { specialMessage,socialURL,donationAmout,id } = req.body; 
  const userId = req.user?.id;
  console.log("user id from donation",userId)
  console.log("donation", donationAmout)
  console.log("donation", specialMessage)
  console.log("donation", socialURL)
  console.log("donation recipendID", id)
  if (!userId) {
    res.status(400).json({ success: false, message: "User ID missing" });
    return;
  }
  if (!donationAmout) {
     res.status(400).json({ success: false, message: " amount are required." })
     return;}

  try {
    const newDonation = await prisma.donation.create({
      data: {
        amount: Number(donationAmout),
        specialMessage:specialMessage,
        socialURLOrBuyMeACoffee:socialURL,
        recipentId: id,
        donorId: userId
        

      },
    });
    res.json({ success: true, data: newDonation });
  } catch (e) {
    console.error(e, "Error creating donation");
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
