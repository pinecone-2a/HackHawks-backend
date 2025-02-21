import { prisma } from "../..";
import { Response } from "express";
import { CustomRequest } from "../../middleware/verifyId";

interface DonationInput {
  amount: number;
  donorName?: string;
  specialMessage?: string;
  socialURLOrBuyMeACoffee?: string;
  recipentId: string;
  donorId?: string;
}

export const createDonation = async (req: CustomRequest, res: Response) => {
  try {
    const { specialMessage, socialURL, donationAmout, id } = req.body;
    const userId = req.user?.id;

    if (!donationAmout) {
      res.status(400).json({ success: false, message: "Amount is required." })
      return;
    }

    const newDonationData: DonationInput = {
      amount: Number(donationAmout),
      specialMessage: specialMessage || "",
      socialURLOrBuyMeACoffee: socialURL || "",
      recipentId: id,
      donorId: userId || undefined,
      donorName: userId ? req.user?.name : "Guest",
    };

    const newDonation = await prisma.donation.create({
      data: {
        amount: newDonationData.amount,
        specialMessage: newDonationData.specialMessage,
        socialURLOrBuyMeACoffee: newDonationData.socialURLOrBuyMeACoffee,
        recipentId: newDonationData.recipentId,
        donorName: newDonationData.donorName,
        ...(newDonationData.donorId ? { donorId: newDonationData.donorId } : {}), // Only include if donorId is defined
      },
    });

     res.json({ success: true, data: newDonation })
     return;
  } catch (e) {
    console.error("Error creating donation:", e);

    if (!res.headersSent) {
     res.status(500).json({ success: false, message: "Internal server error." })
     return ;
    }
  }
};
