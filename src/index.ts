import express from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { usersRouter } from "./router/usersRouter";
import cors from "cors";
import { donationRouter } from "./router/donations";
<<<<<<< HEAD
import { profileRouter } from "./router/profile";
=======
>>>>>>> main
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
configDotenv();

export const prisma = new PrismaClient();

// bank card backend endpoint ///
app.use("/bank-card", bankCardRouter);

// profiel backend endpoint //
app.use("/profile", profileRouter);

// user/auth backend endpoint //
app.use("/users", usersRouter);

<<<<<<< HEAD
// donation backend endpoint //
app.use("/donation", donationRouter);

=======
app.use("/donation", donationRouter);
>>>>>>> main
// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
  console.log(`it's on http://localhost:${PORT}`);
});
