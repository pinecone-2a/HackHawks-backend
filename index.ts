import express from "express";
import { bankCardRouter } from "./router/bankCardRouter";
import { usersRouter } from "./router/usersRouter";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/bankCards", bankCardRouter);
const port = 4000;
app.listen(port, () => {
  console.log(`it's on http://localhost:${port}`);
});
