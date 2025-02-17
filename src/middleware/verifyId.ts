import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decode } from "punycode";

export interface CustomRequest extends Request {
    user?: {id: string};
 }

export const verifyId = (req: CustomRequest, res: Response, next: NextFunction) => {

 
      const accessToken = req.cookies.Authorization; 
   

      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as {id:string};
   
      req.user = {id: decoded.id}
    
     next()
   }

