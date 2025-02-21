import { prisma } from "../..";
import { Response } from "express";
import { CustomRequest } from "../../middleware/verifyId";

export const createDonation = async (req: CustomRequest, res: Response) => {
  try {
    const { specialMessage, socialURL, donationAmout, id } = req.body;
    const userId = req.user?.id || undefined;

    if (!donationAmout) {
      res.status(400).json({ success: false, message: "Amount is required." })
      return;
    }

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
     return;
  } catch (e) {
    console.error("Error creating donation:", e);

    if (!res.headersSent) {
     res.status(500).json({ success: false, message: "Internal server error." })
     return ;
    }
  }
};
