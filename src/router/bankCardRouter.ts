import { PrismaClient } from "@prisma/client";

import { prisma } from "..";
import { createBankCard } from "../controller/bank/CREATE-bankcard";
import { Router } from "express";
import { fetchBankCard } from "../controller/bank/GET-bankcard";

export const bankCardRouter = Router();

bankCardRouter.post("/addnew", createBankCard);
bankCardRouter.get("/", fetchBankCard);
