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
    const { specialMessage, socialURL, donationAmout, id } = req.body; // Destructure the necessary fields from the request body
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("user id from donation", userId);
    console.log("donation", donationAmout);
    console.log("donation", specialMessage);
    console.log("donation", socialURL);
    console.log("donation recipendID", id);
    if (!userId) {
        res.status(400).json({ success: false, message: "User ID missing" });
        return;
    }
    if (!donationAmout) {
        res.status(400).json({ success: false, message: " amount are required." });
        return;
    }
    try {
        const newDonation = yield __1.prisma.donation.create({
            data: {
                amount: Number(donationAmout),
                specialMessage: specialMessage,
                socialURLOrBuyMeACoffee: socialURL,
                recipentId: id,
                donorId: userId
            },
        });
        res.json({ success: true, data: newDonation });
    }
    catch (e) {
        console.error(e, "Error creating donation");
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.createDonation = createDonation;
