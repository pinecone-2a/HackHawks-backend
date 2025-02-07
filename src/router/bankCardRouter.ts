import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { createBankCard } from "../controller/bank/CREATE-bankcard";
import { fetchBankCard } from "../controller/bank/GET-bankcard";

export const bankCardRouter = Router();

bankCardRouter.post("/", createBankCard);

bankCardRouter.get("/", fetchBankCard);
