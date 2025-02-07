import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { checkUsername } from "../controller/user/CREATE-user";
import { createUser } from "../controller/user/CHECK-username";

export const usersRouter = Router();

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);

usersRouter.post("/auth/:username", checkUsername);
