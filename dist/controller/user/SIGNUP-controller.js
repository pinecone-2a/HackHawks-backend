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
exports.signUpController = void 0;
const __1 = require("../..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // hereglegch shalgaj bga
        const existingUser = yield __1.prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "Бүртгэлтэй хэрэглэгч байна",
                code: "USER_EXISTS",
            });
            return;
        }
        const salt = process.env.SALT;
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(salt));
        // shine hereglegch nemeh
        const newUser = yield __1.prisma.user.create({
            data: { username, email, password: hashedPassword },
        });
        res.status(201).json({
            success: true,
            message: "Шинэ хэрэглэгчээр амжилттай бүртгэгдлээ",
            code: "SUCCESSFULLY_CREATED",
            data: newUser,
        });
        return;
    }
    // nemeh yavtsad aldaa garval  
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Серверийн алдаа",
            code: "SERVER_ERROR",
        });
        return;
    }
});
exports.signUpController = signUpController;
