import jwt from "jsonwebtoken"
export const refreshToken = (userId: String): string => {
    const token = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET!,{
        expiresIn:"24h",
    })
    return token
}