"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRouter = void 0;
const express_1 = require("express");
const GET_donation_1 = require("../controller/donation/GET-donation");
const CREATE_donation_1 = require("../controller/donation/CREATE-donation");
const verifyId_1 = require("../middleware/verifyId");
exports.donationRouter = (0, express_1.Router)();
exports.donationRouter.post("/create-donation", verifyId_1.verifyId, CREATE_donation_1.createDonation);
exports.donationRouter.get("/creator/:id", GET_donation_1.fetchDonation);
// backend dashboard fetch endpoint (ene hesegt buh donation bolon amount days-eer filterdehed heregleh bolomjtoi)//
// donationRouter.get("/:userId", receivedDonation);
