import { Request, Response, Router } from "express";
import { createDonation } from "../controller/donation/CREATE-donation";
import { receivedDonation } from "../controller/donation/RECEIVED-donation";
import { searchDonation } from "../controller/donation/SEARCH-donation";
import { totalDonation } from "../controller/donation/TOTAL-donation";

const donationRouter = Router();

donationRouter.post("/create-donation", createDonation);


donationRouter.get("/received/:userId", receivedDonation);


donationRouter.get("/total-earnings/:userId", totalDonation);


donationRouter.get("/search-donations/:userId", searchDonation);
