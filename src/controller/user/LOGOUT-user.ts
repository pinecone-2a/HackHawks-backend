import { Request, Response } from "express";
export const logOutUser = async (req: Request, res: Response) => {
    res.clearCookie("Authorization");

    res.clearCookie("RefreshToken");
    res.json({message: "Хэрэглэгч амжилттай гарлаа", succes:true})
}
   