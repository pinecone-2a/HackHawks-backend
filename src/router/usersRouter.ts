import { Request, Response, Router } from "express";
import { loginUser } from "../controller/user/CURRENT-profile";
import { createUser } from "../controller/user/CREATE-account";
import { prisma } from "..";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../controller/authorization/verify";
import { checkUsername } from "../controller/user/CHECK-username";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const usersRouter = Router();

usersRouter.post("/addnew", createUser);
// login
usersRouter.post("/auth/sign-in", loginUser);

usersRouter.post("/auth/:username", checkUsername);

usersRouter.get("/auth/:userId", async(req:Request, res: Response)=>{
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
usersRouter.get("/auth", async(req:Request, res: Response)=>{
    // const {username} = req.params

    try{
const users = await prisma.profile.findMany()
if(users){
    res.json({users})
}else{
    res.json({message: "user not found"})
}
    }catch(e){
        console.error(e, "aldaa")
    }
});

// Testing purposes
usersRouter.post("/auth/test/login", generateToken);

usersRouter.get("/auth/test/login", verifyToken);
