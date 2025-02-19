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
exports.createBankCard = void 0;
const __1 = require("../..");
const createBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const body = req.body;
    if (!userId) {
        res.status(400).json({ error: "Missing userId" });
        return;
    }
    try {
        // 🔍 Check if a bank card already exists for this user
        const existingCard = yield __1.prisma.bankCard.findUnique({
            where: { userId },
        });
        if (existingCard) {
            res.status(400).json({ error: "User already has a bank card." });
            return;
        }
        // ✅ Create the bank card
        const newCard = yield __1.prisma.bankCard.create({
            data: Object.assign(Object.assign({}, body), { userId })
        });
        res.status(201).json({ message: "success", card: newCard });
    }
    catch (e) {
        console.error("Error creating bank card:", e);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.createBankCard = createBankCard;
