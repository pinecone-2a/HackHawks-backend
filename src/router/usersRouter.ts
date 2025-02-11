import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";

import { createUser } from "../controller/user/CHECK-username";
import { signUPController } from "../controller/user/CREATE-user";
import { signInController } from "../controller/authentication/SIGNIN-auth";

export const usersRouter = Router();

usersRouter.post("/addnew", signUPController);
// login
usersRouter.post("/auth/sign-in", signInController);

usersRouter.post("/auth/:username", signUPController);
