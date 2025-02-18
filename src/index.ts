import express, { Request, Response } from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { configDotenv } from "dotenv";
configDotenv();
import { PrismaClient } from "@prisma/client";
import { usersRouter } from "./router/usersRouter";
import cors from "cors";
import { donationRouter } from "./router/donations";
import { profileRouter } from "./router/profile";
import session from "express-session";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/verifyToken";
import cookieParser from "cookie-parser";
import { signedUserRouter } from "./router/dashboard";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://hackhawks-frontend.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

export const prisma = new PrismaClient();

// bank card backend endpoint ///
app.use("/bank-card", verifyToken, bankCardRouter);

// profiel backend endpoint //
app.use("/profile", profileRouter);

// user/auth backend endpoint //
app.use("/auth", usersRouter);

// donation backend endpoint //
app.use("/donation", donationRouter);

// logged useriin dashboard handah heseg
app.use("/dashboard", verifyToken, signedUserRouter);

// app.use("/navigation")

// refresh token - testing
// app.get("/", async (req: CustomRequest, res: Response) => {
//   const refreshToken = req.cookies.RefreshToken;
//   console.log(refreshToken);
//   try {
//     if (!refreshToken) {
//       res.json({ success: false, code: "NO_TOKEN_PROVIDED" });
//       return;
//     }
//     const refresh = process.env.REFRESH_TOKEN;
//     if (refresh) {
//       const verify = jwt.verify(refreshToken, refresh) as { id: string };

//       if (verify) {
//         const user = await prisma.user.findUnique({
//           where: {
//             id: verify.id,
//           },
//         });
//         if (user) {
//           const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN!, {
//             expiresIn: "5m",
//           });
//           res.cookie("Authorization", accessToken, {
//             httpOnly: true,
//             sameSite: "strict",
//             maxAge: 300000,
//             secure: true,
//           });
//           res.json({ success: true, code: "TOKEN_REFRESHED_SUCCESSFULLY" });
//           console.log(accessToken);
//           return;
//         }
//         res.json({ success: false, message: "User not found" });
//       }
//     }
//     res.json({ success: false, code: "NO_TOKEN_PROVIDED" });
//   } catch (e) {
//     console.error(e, "error");
//   }
// });
// testing purposes

// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
  console.log(`it's on http://localhost:${PORT}`);
});
