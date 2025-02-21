import { prisma } from "../..";
import { Response } from "express";
import { CustomRequest } from "../../middleware/verifyId";

export const createDonation = async (req: CustomRequest, res: Response) => {
  try {
    const { specialMessage, socialURL, donationAmout, id } = req.body;

    // Ensure donationAmout is provided
    if (!donationAmout) {
     res.status(400).json({ success: false, message: "Amount is required." })
     return;
    }

    // Ensure recipient ID is provided
    if (!id) {
      res.status(400).json({ success: false, message: "Recipient ID is required." })
      return;
    }

    const userId = req.user?.id || undefined; // This can be undefined if not logged in

    const newDonation = await prisma.donation.create({
      data: {
        amount: Number(donationAmout), // Ensure donation amount is a number
        specialMessage: typeof specialMessage === 'string' ? specialMessage : "", // Ensure it's a string
        socialURLOrBuyMeACoffee: typeof socialURL === 'string' ? socialURL : "", // Ensure it's a string
        recipentId: id as string, // Ensure id is treated as a string
        donorId: userId === undefined ? undefined : userId, // Ensure donorId is either string or undefined
      },
    });

     res.json({ success: true, data: newDonation })
     return;
  } catch (e) {
    console.error("Error creating donation:", e);

    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Internal server error." })
      return;
    }
  }
};
