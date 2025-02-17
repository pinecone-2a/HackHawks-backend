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
exports.forgotPassword = void 0;
const __1 = require("../..");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield __1.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        const otp = Math.floor(Math.random() * 899999 + 10000);
        yield __1.prisma.otp.create({
            data: {
                email,
                otp
            }
        });
        res.status(200).json({
            message: "SENT_OTP",
            success: true,
            data: null,
            code: "SENT_OTP",
        });
        const info = yield transporter.sendMail({
            from: "Buy me coffee <duuavia28@gmail.com>",
            to: email,
            subject: "OTP from buymecoffee",
            text: String(otp),
            html: String(otp),
        });
        return;
    }
    if (!user) {
        res.status(401).json({
            message: "Бүртгэлгүй хэрэглэгч байна",
            success: false,
            data: null,
            code: "USER_NOT_FOUND",
        });
        return;
    }
});
exports.forgotPassword = forgotPassword;
