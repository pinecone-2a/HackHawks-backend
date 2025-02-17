import { Request, Response } from "express";
export const logOutUser = async (req: Request, res: Response) => {
    res.clearCookie("Authorization",{httpOnly:true, sameSite: "none", secure:true});

    res.clearCookie("RefreshToken", {httpOnly:true, sameSite:"none", secure:true});
    res.json({message: "Хэрэглэгч амжилттай гарлаа", succes:true})
}
   