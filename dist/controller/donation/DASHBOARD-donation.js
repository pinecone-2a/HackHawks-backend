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
exports.receivedDonation = void 0;
const __1 = require("../..");
const receivedDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const amount = req.query.amount ? Number(req.query.amount) : 0;
    const days = req.query.days ? Number(req.query.days) : 90;
    const lte = new Date();
    const gte = new Date(lte);
    gte.setDate(lte.getDate() - Number(days));
    try {
        const donation = yield __1.prisma.donation.findMany({
            where: {
                AND: [{ recipentId: userId }, amount ? { amount: Number(amount) } : {}],
            },
            include: {
                recipent: {
                    select: {
                        profile: true
                    }
                },
                donor: {
                    select: {
                        profile: true
                    }
                }
            }
        });
        // aggregate ashiglah
        const totalEarnings = yield __1.prisma.donation.aggregate({
            where: {
                recipentId: userId,
                createdAt: { gte, lte },
            },
            _sum: {
                amount: true,
            },
        });
        res.json({ donation, totalEarnings, success: true });
    }
    catch (e) {
        console.error(e, "received donation error");
    }
});
exports.receivedDonation = receivedDonation;
