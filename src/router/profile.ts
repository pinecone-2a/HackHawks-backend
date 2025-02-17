import { Request, Response, Router } from "express";
import { EditProfile, updateCover } from "../controller/profile/EDIT-profile";
import { createProfile } from "../controller/profile/CREATE-profile";
import { profileUserid } from "../controller/profile/CREATOR-profile";
import { searchProfileExplore } from "../controller/profile/EXPLORE-profile";
import { getProfile } from "../controller/profile/GET-profile";
import { verifyAuth } from "../controller/user/VERIFY-auth";
import { verifyToken } from "../middleware/verifyToken";



export const profileRouter = Router();
// dashboardiin profile-d zoriulsan
profileRouter.get("/dashboard", verifyToken, getProfile)

profileRouter.post("/", createProfile)

profileRouter.get("/explore", searchProfileExplore);

profileRouter.get("/explore/:id", profileUserid)

profileRouter.put("/updateCover/:userId", updateCover);

profileRouter.put(`/update`,  EditProfile);
