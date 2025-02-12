import { Request, Response, Router } from "express";
import { verifyToken } from "../controller/authorization/verify";
import { CustomRequest } from "./usersRouter";
import { prisma } from "..";

export const testingRouter = Router();

testingRouter.get(
  "/",
  verifyToken,
  async (req: CustomRequest, res: Response) => {
    const userId = req.userId;

    const day30 = new Date(new Date().setDate(new Date().getDate() - 30));
    const day60 = new Date(new Date().setDate(new Date().getDate() - 60));
    const day90 = new Date(new Date().setDate(new Date().getDate() - 60));
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          recievedDonations: true,
          sendDonation: true,
          profile: true,
        },
      });
      const totalEarnings = user?.recievedDonations.reduce((acc, donor) => {
        return (acc += donor.amount);
      }, 0);
      const day30data = await prisma.donation.findMany({
        where: {
          recipentId: user?.id,
          createdAt: { gte: day30 },
        },
        include: {
          donor: true,
        },
      });
      const day60data = await prisma.donation.findMany({
        where: {
          recipentId: user?.id,
          createdAt: { gte: day60 },
        },
        include: {
          donor: true,
        },
      });
      const day90data = await prisma.donation.findMany({
        where: {
          recipentId: user?.id,
          createdAt: { gte: day90 },
        },
        include: {
          donor: true,
        },
      });
      const day30earnings = day30data.reduce((acc, amount) => {
        return (acc += amount.amount);
      }, 0);
      const day60earnings = day60data.reduce((acc, amount) => {
        return (acc += amount.amount);
      }, 0);
      const day90earnings = day60data.reduce((acc, amount) => {
        return (acc += amount.amount);
      }, 0);
      res.json({
        user,
        success: true,
        earningsData: { day30data, day60data, day90data },
        earnings: { day30earnings, day60earnings, day90earnings },
      });
    } catch (e) {
      console.error("aldaa", e);
    }
  }
);
