import express, { Request, Response } from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { usersRouter } from "./router/usersRouter";
import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";

const cors = require("cors");
const app = express();

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
configDotenv();
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

// user backend url //
app.use("/profile", usersRouter);

// bank card backend url ///
app.use("/bank-card", bankCardRouter);
const port = 4000;

// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(port, () => {
  console.log(`it's on http://localhost:${port}`);
});
