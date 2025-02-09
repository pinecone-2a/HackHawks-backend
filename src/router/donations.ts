import { Request, Response, Router } from "express";

import { receivedDonation } from "../controller/donation/RECEIVED-donation";
import { fetchAllDonation } from "../controller/donation/USERID-donation";


export const donationRouter = Router();

donationRouter.post("/create-donation");

donationRouter.get("/received/:userId", receivedDonation);

donationRouter.get("/total-earnings/:userId");

donationRouter.get("/", fetchAllDonation);
