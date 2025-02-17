"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signedUserRouter = void 0;
const express_1 = require("express");
const DASHBOARD_donation_1 = require("../controller/donation/DASHBOARD-donation");
exports.signedUserRouter = (0, express_1.Router)();
exports.signedUserRouter.get("/", DASHBOARD_donation_1.receivedDonation);
