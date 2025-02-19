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
exports.signInController = void 0;
const __1 = require("../..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require("jsonwebtoken");
const generateToken = (user, secret, expiresIn) => {
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
};
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield __1.prisma.user.findFirst({ where: { email } });
        if (!existingUser) {
            res.status(400).json({ message: "NOT_REGISTERED", success: false });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "WRONG_PASSWORD", success: false });
            return;
        }
        const existingProfile = yield __1.prisma.profile.findFirst({
            where: { userId: existingUser.id },
        });
        const accessToken = generateToken(existingUser, process.env.ACCESS_TOKEN_SECRET, "30m");
        const refreshToken = generateToken(existingUser, process.env.REFRESH_TOKEN_SECRET, "2h");
        res.cookie("Authorization", accessToken, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });
        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });
        res.json({
            message: "Welcome back",
            success: true,
            profileSetup: !!existingProfile,
            data: { id: existingUser.id },
        });
        return;
    }
    catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "INTERNAL_SERVER_ERROR", success: false });
        return;
    }
});
exports.signInController = signInController;
