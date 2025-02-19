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
exports.updatePassword = void 0;
const __1 = require("../..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const newPassword = req.body.newPassword;
    console.log(userId);
    try {
        if (!newPassword) {
            res.json({
                status: 400,
                code: "PASSWORD failed",
                success: true,
                message: "Password update failed",
                data: null
            });
        }
        const salt = bcrypt_1.default.genSaltSync(8);
        const hashedPass = bcrypt_1.default.hashSync(newPassword, salt);
        const updatedPass = yield __1.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPass
            }
        });
        res.json({
            status: 200,
            code: "PASSWORD_UPDATED",
            success: true,
            message: "Password successfully updated",
            data: updatedPass
        });
    }
    catch (e) {
        console.log(e, "error while updating password");
    }
});
exports.updatePassword = updatePassword;
