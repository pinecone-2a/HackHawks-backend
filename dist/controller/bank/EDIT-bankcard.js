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
exports.editBankCard = void 0;
const __1 = require("../..");
const editBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
    try {
        const updatedBankCard = yield __1.prisma.bankCard.update({
            where: {
                userId: userId,
            },
            data: {
                country,
                firstName,
                lastName,
                cardNumber,
                expiryDate,
            },
        });
        res.json({
            status: 200,
            code: "UPDATE_CARD_SUCCESSFULL",
            message: "card informations updated succefully",
            success: true,
            data: updatedBankCard,
        });
    }
    catch (e) {
        console.log(e, "error while updating bankcard");
    }
});
exports.editBankCard = editBankCard;
