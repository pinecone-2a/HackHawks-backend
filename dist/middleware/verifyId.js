"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyId = (req, res, next) => {
    const accessToken = req.cookies.Authorization;
    const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: decoded.id };
    next();
};
exports.verifyId = verifyId;
