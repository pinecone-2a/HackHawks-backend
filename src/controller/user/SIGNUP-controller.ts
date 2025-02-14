import { Request, Response } from "express";
import { prisma } from "../..";
import { CustomRequest } from "../../router/usersRouter";
import bcrypt from "bcrypt"

export const signUpController = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // hereglegch shalgaj bga
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
           res.status(409).json({
                success: false,
                message: "Бүртгэлтэй хэрэглэгч байна",
                code: "USER_EXISTS",
            });
            return;
        }

        const salt = process.env.SALT;
        const hashedPassword = await bcrypt.hash(password, Number(salt))

        // shine hereglegch nemeh
        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword},
        });

        res.status(201).json({
            success: true,
            message: "Шинэ хэрэглэгчээр амжилттай бүртгэгдлээ",
            code: "SUCCESSFULLY_CREATED",
            data: newUser,
        });
        return;
    } 
        // nemeh yavtsad aldaa garval  
        catch (error) {
       res.status(500).json({
            success: false,
            message: "Серверийн алдаа",
            code: "SERVER_ERROR",
        });
        return;
    }
};