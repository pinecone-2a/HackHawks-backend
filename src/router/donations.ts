import { Request, Response, Router } from "express";
import { receivedDonation } from "../controller/donation/DASHBOARD-donation";
import { prisma } from "..";
import { fetchDonation } from "../controller/donation/GET-donation";
import { createDonation } from "../controller/donation/CREATE-donation";
import { verifyToken } from "../middleware/verifyToken";
import { verifyId } from "../middleware/verifyId";

export const donationRouter = Router();

donationRouter.post("/create-donation", verifyId, createDonation);

donationRouter.get("/creator/:id", fetchDonation)

// backend dashboard fetch endpoint (ene hesegt buh donation bolon amount days-eer filterdehed heregleh bolomjtoi)//
// donationRouter.get("/:userId", receivedDonation);
