import { Request, Response, Router } from "express";
import { prisma } from "..";

const donationRouter = Router();
// POST /donation/create-donation
donationRouter.post("/create-donation", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newDonation = await prisma.donation.create({
      data: body,
    });
    res.json(newDonation);
  } catch (e) {
    console.error(e, "aldaa");
  }
});

// GET /donation/received/:userId
donationRouter.get("/received/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const donation = await prisma.donation.findUnique({
        where: {
          userId,
        },
      });
      res.json(donation);
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
});

// GET /donation/total-earnings/:userId
donationRouter.get("/total-earnings/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const donation = await prisma.donation.findMany({
        where: {
          userId,
        },
      });
      res.json(donation);
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
});

// GET /donation/search-donations/:userId
donationRouter.get("/search-donations/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const donation = await prisma.donation.findUnique({
        where: {
          userId,
        },
      });
      res.json(donation);
    }
  } catch (e) {
    console.error(e, "aldaa");
  }
});
