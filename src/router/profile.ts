import { Router } from "express";
import { profileExplore } from "../controller/profile/EXPLORE-profile";
import { profileUserid } from "../controller/profile/USERID-profile";

export const profileRouter = Router();

profileRouter.get("/explore", profileExplore);

profileRouter.get("/explore/:id", profileUserid);
