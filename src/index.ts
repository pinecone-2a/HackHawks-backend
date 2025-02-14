import express from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { usersRouter } from "./router/usersRouter";
import { profileRouter } from "./router/profileRouter";
import cors from "cors";
import { donationRouter } from "./router/donations";
const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
configDotenv();

export const prisma = new PrismaClient();

// user backend url //
app.use("/profile", profileRouter);

// bank card backend url ///
app.use("/bank-card", bankCardRouter);

app.use("/profile", profileRouter);

app.use("/users", usersRouter);

app.use("/donation", donationRouter);
// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
  console.log(`it's on http://localhost:${PORT}`);
});
