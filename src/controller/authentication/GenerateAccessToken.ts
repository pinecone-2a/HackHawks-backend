import jwt from "jsonwebtoken"
export const generateAccessToken = (userId: String): string => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET!,{
        expiresIn:"5m",
    })
    return token
}