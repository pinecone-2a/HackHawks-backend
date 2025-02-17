import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyAuth = async (req: Request, res: Response) => {
    const token = req.cookies.Authorization; 
    
    if (!token) {
     res.json({ loggedIn: false }); return
    }
  
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
     res.json({ loggedIn: true });  return 
    } catch {
      res.json({ loggedIn: false });  return
    }
  }