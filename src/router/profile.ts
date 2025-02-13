import { Request, Response, Router } from "express";
import { profileExplore } from "../controller/profile/EXPLORE-profile";
import { prisma } from "..";
import { verifyToken } from "../controller/authorization/verify";
import { CustomRequest } from "./usersRouter";
import { EditProfile, updateCover } from "../controller/profile/EDIT-profile";

export const profileRouter = Router();

profileRouter.get("/explore", profileExplore);
profileRouter.put("/updateCover/:userId", updateCover);

profileRouter.put(`/update`, verifyToken, EditProfile);
