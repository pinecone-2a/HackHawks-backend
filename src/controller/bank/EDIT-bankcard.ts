import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../middleware/verifyToken";
export const editBankCard = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id
  const { selectedCountry, firstName, lastName, cardNumber, expiryDate } = req.body;
  console.log("helloo from edit card", selectedCountry, firstName, lastName, cardNumber, expiryDate)
  try {
    const updatedBankCard = await prisma.bankCard.update({
      where: {
        userId
      },
      data: {
        country:selectedCountry,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
      },
    });
    res.json({
      status: 200,
      code: "UPDATE_CARD_SUCCESSFULL",
      message: " Амжилттай шинэчлэгдлээ",
      success: true,
      data: updatedBankCard,
    });
  } catch (e) {
    console.log(e, "error while updating bankcard");
  }
};
