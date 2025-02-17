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
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.Authorization;
    if (!token) {
        res.json({ loggedIn: false });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.json({ loggedIn: true });
        return;
    }
    catch (_a) {
        res.json({ loggedIn: false });
        return;
    }
});
exports.verifyAuth = verifyAuth;
