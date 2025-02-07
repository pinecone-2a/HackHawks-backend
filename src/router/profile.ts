import { Router } from "express";
import { profileExplore } from "../controller/profile/EXPLORE-profile";

export const profileRouter = Router();

profileRouter.get("/explore", profileExplore);
