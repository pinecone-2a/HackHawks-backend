import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { createUser } from "../controller/user/CREATE-account";
import { prisma } from "..";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../controller/authorization/verify";
import { checkUsername } from "../controller/user/CHECK-username";
import { fetchAllUsersProfile } from "../controller/user/VIEW-profile";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const usersRouter = Router();

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);

usersRouter.post("/auth/:username", checkUsername);

usersRouter.get("/auth/explore/:userId", async(req:Request, res: Response)=>{
    const {userId} = req.params

    try{
const profile = await prisma.profile.findUnique({
    where: {
        userId
    }
})
if(profile){
    res.json({profile})
}else{
    res.json({message: "user not found"})
}
    }catch(e){
        console.error(e, "aldaa")
    }
});
usersRouter.get("/auth", fetchAllUsersProfile);

// Testing purposes
usersRouter.post("/auth/test/login", generateToken);

usersRouter.get("/auth/test/login", verifyToken);
