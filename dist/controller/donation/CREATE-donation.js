"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonation = void 0;
const __1 = require("../..");
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { specialMessage, socialURL, donationAmout, id } = req.body;
        // Ensure donationAmout is provided
        if (!donationAmout) {
            res.status(400).json({ success: false, message: "Amount is required." });
            return;
        }
        // Ensure recipient ID is provided
        if (!id) {
            res.status(400).json({ success: false, message: "Recipient ID is required." });
            return;
        }
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || undefined; // This can be undefined if not logged in
        const newDonation = yield __1.prisma.donation.create({
            data: {
                amount: Number(donationAmout), // Ensure donation amount is a number
                specialMessage: typeof specialMessage === 'string' ? specialMessage : "", // Ensure it's a string
                socialURLOrBuyMeACoffee: typeof socialURL === 'string' ? socialURL : "", // Ensure it's a string
                recipentId: id, // Ensure id is treated as a string
                donorId: userId === undefined ? undefined : userId, // Ensure donorId is either string or undefined
            },
        });
        res.json({ success: true, data: newDonation });
        return;
    }
    catch (e) {
        console.error("Error creating donation:", e);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Internal server error." });
            return;
        }
    }
});
exports.createDonation = createDonation;
