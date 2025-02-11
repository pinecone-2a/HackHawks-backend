import { Request, Response, Router } from "express";
import { prisma } from "../..";
const bcrypt = require("bcryptjs")
export const signUPController = async(req: Request, res: Response) =>{
  const {username, email, password } = req.body;
  const isUserExist = await prisma.user.findFirst({
      where: {
          email
      }
  });
if(isUserExist){
  res.status(409).json({
      succes: false,
      message:"User already exists",
      code:"USER_EXISTS",
      data:null
  })
  return;
}
const salt = 10
const hashedPassword = bcrypt.hashSync(password, salt)

const result = await prisma.user.create({
  data:{
    username,
    email,
    password : hashedPassword
  }
})
res.status(201).json({
success: true,
data: result,
code: "SUCCESS",
message: "SUCCESSFULLY CREATED"
})
}
