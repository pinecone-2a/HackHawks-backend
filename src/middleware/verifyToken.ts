import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decode } from "punycode";

dotenv.config();

export interface CustomRequest extends Request {
   user?: {id: string};
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {

   try{
      const accessToken = req.cookies.Authorization; 
     if (!accessToken) {
        res.status(401).json({ message: "Access Denied. No token provided." })
        return;
     }

      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as {id:string};
   
      req.user = {id: decoded.id}
     console.log(decoded)
     next()
   }catch(e){
      console.error("JWT_VERIFY_ERROR", e)
     res.status(403).json({ message: "Invalid or expired token." })
     return;
   }

};
