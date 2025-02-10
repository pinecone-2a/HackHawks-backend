import { Request, Response, Router } from "express";

import { receivedDonation } from "../controller/donation/RECEIVED-donation";

import { totalDonation } from "../controller/donation/TOTAL-donation";
import { prisma } from "..";

export const donationRouter = Router();
// ajillaj bga code 1
donationRouter.post("/create-donation", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const newDonation = await prisma.donation.create({
      data: body,
    });
    res.json({ message: "Donate success" });
  } catch (e) {
    console.error(e, "aldaa");
  }
});
// ajillaj bga code 2
donationRouter.get("/received/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const receivedDonation = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        recievedDonations: true,
      },
    });
    res.json({ message: "Found it", receivedDonation });
  } catch (e) {
    console.error(e, "aldaa");
  }
});
// ajillaj bga code 3

donationRouter.get(
  "/total-earnings/:userId",
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          recievedDonations: true,
        },
      });
      const totalearnings = data?.recievedDonations.reduce((acc, curr) => {
        return (acc += curr.amount);
      }, 0);
      res.json({ totalearnings });
    } catch (e) {
      console.error(e, "aldaa");
    }
  }
);
// still working on it
// donationRouter.get("/sum/:userId", async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const today = new Date();
//   const a = new Date(today);
//   const day = today.getDate();
//   const filterDate = new Date();
//   console.log(filterDate);
//   try {
//     const data = await prisma.donation.aggregate({
//       where: {
//         donorId: userId,
//       },
//       _avg: {
//         amount: true,
//       },
//     });
//     res.json({ data });
//   } catch (e) {
//     console.error(e, "aldaa");
//   }
// });

donationRouter.get("/search-donations/:userId");
