import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { createBankCard } from "../controller/bank/CREATE-bankcard";
import { fetchBankCard } from "../controller/bank/GET-bankcard";
import { editBankCard } from "../controller/bank/EDIT-bankcard";


export const bankCardRouter = Router();

//banknii card uusgeh endpoint
bankCardRouter.post("/addnew", createBankCard);

//banknii cardniihaa medeelliig duudaj awah endpoint
bankCardRouter.get("/", fetchBankCard);

// banknii cardniihaa medeelliig oorchloh endpoint
bankCardRouter.put("/update", editBankCard)

