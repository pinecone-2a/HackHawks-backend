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
exports.createProfile = void 0;
const __1 = require("../.."); // Adjust path as needed
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, about, avatarImage, socialMediaURL } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log(userId);
        if (!name || !about || !avatarImage || !socialMediaURL) {
            res.status(400).json({ error: "Хоосон талбар байна" });
            return;
        }
        if (!userId) {
            res.status(400).json({ error: "User ID is missing" });
            return;
        }
        const profile = yield __1.prisma.profile.create({
            data: { name, about, avatarImage, socialMediaURL, userId },
        });
        res.status(201).json({ message: "success", profile });
    }
    catch (error) {
        res.status(500).json({ error: (error === null || error === void 0 ? void 0 : error.message) || "Серверийн алдаа" });
    }
});
exports.createProfile = createProfile;
