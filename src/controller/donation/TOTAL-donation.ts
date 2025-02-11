// import express, { Request, Response } from "express";
// import { prisma } from "../..";

// export const totalDonation = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const donation = await prisma.donation.findMany({
//       where: {
//         recipentId: id,
//       },
//     });
//     // aggregate ashiglah
//     const totalEarnings = await prisma.donation.aggregate({
//       where: {
//         recipentId: id,
//       },
//       _sum: {
//         amount: true,
//       },
//     });
//     res.json({ totalEarnings });
//   } catch (e) {
//     console.error(e, "received donation error");
//   }
// };
