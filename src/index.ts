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

// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
  console.log(`it's on http://localhost:${PORT}`);
});
