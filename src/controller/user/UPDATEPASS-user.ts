import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../middleware/verifyToken";
import bcrypt from "bcrypt";

export const updatePassword = async(req:CustomRequest, res:Response) =>{
    const userId = req.user?.id
    const newPassword = req.body.newPassword
    console.log(userId)
    try {
        if(!newPassword){
            res.json({
                status:400,
                code:"PASSWORD failed",
                success: true,
                message: "Password update failed",
                data: null
            })
        }
    const salt = bcrypt.genSaltSync(8)
    const hashedPass =  bcrypt.hashSync(newPassword, salt)
    const updatedPass = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            password: hashedPass
        }
    })
    res.json({
        status:200,
        code:"PASSWORD_UPDATED",
        success: true,
        message: "Password successfully updated",
        data: updatedPass
    })
} catch(e){
    console.log(e,"error while updating password")
}
}