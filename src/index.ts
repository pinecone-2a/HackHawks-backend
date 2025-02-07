import express from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { usersRouter } from "./router/usersRouter";
import { profileRouter } from "./router/Profile";
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
configDotenv();

export const prisma = new PrismaClient();

// user backend url //
app.use("/auth", usersRouter);

// bank card backend url ///
app.use("/bank-card", bankCardRouter);

app.use("/profile", profileRouter);

// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
  console.log(`it's on http://localhost:${PORT}`);
});
