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
exports.logOutUser = void 0;
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("Authorization", { httpOnly: true, sameSite: "none", secure: true });
    res.clearCookie("RefreshToken", { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Хэрэглэгч амжилттай гарлаа", succes: true });
});
exports.logOutUser = logOutUser;
