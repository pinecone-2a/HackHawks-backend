import { Request, Response, Router } from "express";
import { receivedDonation } from "../controller/donation/GET-donation";
import { totalDonation } from "../controller/donation/TOTAL-donation";

export const donationRouter = Router();

donationRouter.post("/create-donation");

// backend dashboard fetch endpoint (ene hesegt buh donation bolon amount days-eer filterdehed heregleh bolomjtoi)//
donationRouter.get("/:userId", receivedDonation);

// backend total donation tootsolson endpoint//
donationRouter.get("/total");
