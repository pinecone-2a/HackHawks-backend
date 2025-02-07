import { createBankCard } from "../controller/bank/CREATE-bankcard";
import express, { Router, Request, Response } from "express";
import { fetchBankCard } from "../controller/bank/GET-bankcard";

export const bankCardRouter = Router();

bankCardRouter.post("/add", createBankCard);

// bankCardRouter.patch("/:userId",  editBankCard);

bankCardRouter.get("/", fetchBankCard);
