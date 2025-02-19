"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.cookies.Authorization;
        if (!accessToken) {
            res.status(401).json({ message: "Access Denied. No token provided." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch (e) {
        console.error("JWT_VERIFY_ERROR", e);
        res.status(403).json({ message: "Invalid or expired token." });
        return;
    }
};
exports.verifyToken = verifyToken;
