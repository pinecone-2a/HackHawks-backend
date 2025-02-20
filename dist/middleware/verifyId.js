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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const verifyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies.Authorization;
        if (!accessToken) {
            return next(); // Do not send a response here
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const profile = yield __1.prisma.profile.findUnique({
            where: { userId: decoded.id },
        });
        req.user = {
            id: decoded.id,
            name: (profile === null || profile === void 0 ? void 0 : profile.name) || "Anonymous",
        };
        next(); // Make sure next() is only called once
    }
    catch (e) {
        console.log("Token not found, donation as guest?");
        next(); // Do not send a response here, just proceed
    }
});
exports.verifyId = verifyId;
