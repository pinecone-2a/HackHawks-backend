import { Request, Response, Router } from "express";

import { receivedDonation } from "../controller/donation/DASHBOARD-donation";



export const signedUserRouter = Router();

signedUserRouter.get("/",  receivedDonation);
