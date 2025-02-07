import express, { Request, Response } from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { usersRouter } from "./router/usersRouter";
import { configDotenv } from "dotenv";
import { profileRouter } from "./router/profileRouter";

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
configDotenv();

app.use("/users", usersRouter);

app.use("/profile", profileRouter);

app.use("/bank-card", bankCardRouter);
const port = 4000;
app.listen(port, () => {
  console.log(`it's on http://localhost:${port}`);
});
