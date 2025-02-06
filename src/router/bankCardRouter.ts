

import { createBankCard } from "../controller/bank/CREATE-bankcard";
import express, { Router, Request, Response } from "express";
import { fetchBankCard } from "../controller/bank/GET-bankcard";
import { editBankCard } from "../controller/bank/EDIT-bankcard";



export const bankCardRouter = Router();

bankCardRouter.post("/:userId",  createBankCard);

bankCardRouter.patch("/:userId",  editBankCard);

bankCardRouter.get("/:bankCardId", fetchBankCard);


