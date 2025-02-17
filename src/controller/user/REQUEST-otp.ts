import { Request, Response, Router } from "express";
import { prisma } from "../..";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})
    

export const forgotPassword = async(req:Request, res:Response)=>{
const {email} = req.body
const user =  await prisma.user.findUnique({
    where:{
        email
    }
})
if (user) {
    const otp = Math.floor(Math.random()*899999+10000);

    await prisma.otp.create({
        data:{
            email,
            otp
        }
    });
    res.status(200).json({ 
        message: "SENT_OTP" ,
        success:true,
        data:null,
        code: "SENT_OTP",
    });

const info = await transporter.sendMail({
    from:"Buy me coffee <duuavia28@gmail.com>",
    to:email,
    subject:"OTP from buymecoffee",
    text:String(otp),
    html:String(otp),
})
    return;
}
if(!user){
    res.status(401).json({ 
        message: "Бүртгэлгүй хэрэглэгч байна" ,
        success:false,
        data:null,
        code: "USER_NOT_FOUND",
    });
    return;
}
}

