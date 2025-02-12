import { Request, Response, Router } from "express";
import { profileExplore } from "../controller/profile/EXPLORE-profile";
import { editProfile } from "../controller/profile/EDIT-profile";
import { prisma } from "..";

export const profileRouter = Router();

profileRouter.get("/explore", profileExplore);

profileRouter.put("/:userId", editProfile)
profileRouter.put("/updateCover/:userId", async(req: Request, res: Response)=>{
    const {image} = req.body
    const {userId} = req.params
    console.log("userId", userId)
    console.log("image", image)
    try{
const user = await prisma.profile.findUnique({
    where: {
        userId
    }
})
if (user){
    const change = await prisma.profile.update({
        where: {
            userId
        },
        data:{
            backgroundImage: image
        }
    })
    res.json({message: "success"})
    console.log(change)
}
    }catch(e){
        console.error(e, "aldaa")
    }
})