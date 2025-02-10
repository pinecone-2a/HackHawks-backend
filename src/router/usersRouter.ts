import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { createUser } from "../controller/user/CREATE-account";
import { checkUsername } from "../controller/user/check-username";
import { prisma } from "..";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../controller/authorization/verify";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const usersRouter = Router();

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);

usersRouter.post("/auth/:username", checkUsername);

// Testing purposes
usersRouter.post("/auth/test/login", generateToken);

usersRouter.get("/auth/test/login", verifyToken);
