import express from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { usersRouter } from "./router/usersRouter";
import cors from "cors";
require("dotenv").config();
import { donationRouter } from "./router/donations";
import { profileRouter } from "./router/profile";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


export const prisma = new PrismaClient();

// bank card backend endpoint ///
app.use("/bank-card", bankCardRouter);

// profiel backend endpoint //
app.use("/profile", profileRouter);

// user/auth backend endpoint //
app.use("/users", usersRouter);

// donation backend endpoint //
app.use("/donation", donationRouter);

// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
  console.log(`it's on http://localhost:${PORT}`);
});
