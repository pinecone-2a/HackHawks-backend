import { prisma } from "../..";
import { Response } from "express";
import { CustomRequest } from "../../middleware/verifyId";

export const createDonation = async (req: CustomRequest, res: Response) => {
  try {
    const { specialMessage, socialURL, donationAmout, id } = req.body;

    
    if (!donationAmout) {
       res.status(400).json({ success: false, message: "Amount is required." })
       return
    }
    if (!id) {
    res.status(400).json({ success: false, message: "Recipient ID is required." })
    return 
    }

    // Get userId and ensure it's either a string or null
    const userId = req.user?.id || null;

    const newDonation = await prisma.donation.create({
      data: {
        amount: Number(donationAmout),
        specialMessage: specialMessage || "",
        socialURLOrBuyMeACoffee: socialURL || "",
        recipentId: id,
        donorId: userId, 
      },
    });

    res.json({ success: true, data: newDonation })
    return
  } catch (e) {
    console.error("Error creating donation:", e);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Internal server error." })
      return
    }
  }
};
