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
exports.checkUsername = void 0;
const __1 = require("../..");
const checkUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (username.length < 6) {
        res.json({ message: "username is too short", no: "no" });
        return;
    }
    try {
        const existingUser = yield __1.prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (existingUser) {
            res.json({ message: "username is taken", no: "no" });
        }
        else {
            res.json({ message: "username is available", yes: "yes" });
            return;
        }
    }
    catch (e) {
        console.error(e, "aldaa");
    }
});
exports.checkUsername = checkUsername;
