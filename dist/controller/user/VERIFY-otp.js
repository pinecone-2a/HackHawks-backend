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
exports.verifyOTP = void 0;
const __1 = require("../..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp: userOTP, password } = req.body;
    try {
        // input ees otp irehdee string turluur ireed bga uchraas int bolgoj bga heseg
        const otpNumber = parseInt(userOTP, 10);
        if (isNaN(otpNumber)) {
            res.status(400).json({
                message: "OTP string эсвэл буруу format-тай байна",
                success: false,
                code: "INVALID_OTP_FORMAT",
            });
            return;
        }
        // otp shalgalt
        const otpRecord = yield __1.prisma.otp.findFirst({
            where: { email, otp: otpNumber },
        });
        if (!otpRecord) {
            res.status(400).json({
                message: "OTP хугацаа дууссан эсвэл буруу OTP",
                success: false,
                code: "INVALID_OTP",
            });
            return;
        }
        // shine pass
        const hashedPass = yield bcrypt_1.default.hash(password, Number(process.env.SALT));
        yield __1.prisma.user.update({
            where: { email },
            data: { password: hashedPass },
        });
        // hereglej duussan otpnuudaa delete hiih
        yield __1.prisma.otp.deleteMany({ where: { email } });
        res.status(200).json({
            message: "Нууц үг амжилттай солигдлоо",
            success: true,
            code: "PASS_CHANGED_SUCCESSFULLY",
        });
        return;
    }
    catch (error) {
        console.error("OTP шалгалт алдаа:", error);
        res.status(500).json({
            message: "Сервер талын алдаа",
            success: false,
            code: "SERVER_ERROR",
        });
        return;
    }
});
exports.verifyOTP = verifyOTP;
