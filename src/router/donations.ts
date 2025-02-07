import { Request, Response, Router } from "express";

import { receivedDonation } from "../controller/donation/RECEIVED-donation";

import { totalDonation } from "../controller/donation/TOTAL-donation";

const donationRouter = Router();

donationRouter.post("/create-donation");

donationRouter.get("/received/:userId", receivedDonation);

donationRouter.get("/total-earnings/:userId", totalDonation);

donationRouter.get("/search-donations/:userId");
