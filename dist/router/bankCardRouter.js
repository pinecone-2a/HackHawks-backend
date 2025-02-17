"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankCardRouter = void 0;
const express_1 = require("express");
const CREATE_bankcard_1 = require("../controller/bank/CREATE-bankcard");
const GET_bankcard_1 = require("../controller/bank/GET-bankcard");
const EDIT_bankcard_1 = require("../controller/bank/EDIT-bankcard");
exports.bankCardRouter = (0, express_1.Router)();
//banknii card uusgeh endpoint
exports.bankCardRouter.post("/addnew", CREATE_bankcard_1.createBankCard);
//banknii cardniihaa medeelliig duudaj awah endpoint
exports.bankCardRouter.get("/", GET_bankcard_1.fetchBankCard);
// banknii cardniihaa medeelliig oorchloh endpoint
exports.bankCardRouter.put("/:userId", EDIT_bankcard_1.editBankCard);
