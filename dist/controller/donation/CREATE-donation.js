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
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || undefined;
        if (!donationAmout) {
            res.status(400).json({ success: false, message: "Amount is required." });
            return;
        }
        const newDonation = yield __1.prisma.donation.create({
            data: {
                amount: Number(donationAmout),
                specialMessage: specialMessage || "",
                socialURLOrBuyMeACoffee: socialURL || "",
                recipentId: id,
                donorId: userId,
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
