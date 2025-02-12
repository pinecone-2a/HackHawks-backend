import { Router } from "express";
import { profileExplore } from "../controller/profile/EXPLORE-profile";
import { editProfile } from "../controller/profile/EDIT-profile";
import { fetchProfile } from "../controller/profile/GET-profile";

export const profileRouter = Router();

profileRouter.get("/explore", profileExplore);

profileRouter.put("/:userId", editProfile);

profileRouter.get("/:userId", fetchProfile);
