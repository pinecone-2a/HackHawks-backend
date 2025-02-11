import { Request, Response, Router } from "express";
import { prisma } from "../..";
const bcrypt = require("bcryptjs")
export const signInController = async(req: Request, res: Response) =>{
  const {email, password } = req.body;
  const user = await prisma.user.findFirst({
      where: {
          email
      }
  });
if(!user){
  res.status(409).json({
      succes: false,
      message:"User not found",
      code:"USER_NOT_FOUND",
      data:null
  })
  return;
}

if (bcrypt.compareSync(password, user.password)){
    res.status(200).json({
        succes: false,
        message:"Successfully signed in",
        code:"SIGNED_IN",
        data:{}
    })
    return;
}
{
    res.json({
        succes: false,
        message:"password incorrect",
        code:"PASSWORD_INCORRECT",
        data:{}
    })
    }
}