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
exports.updateCover = exports.EditProfile = void 0;
const __1 = require("../..");
const EditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, about, socialUrl, avatarImage } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("from cover", userId);
    console.log(req.body);
    try {
        const updatedProfile = yield __1.prisma.profile.update({
            where: {
                userId,
            },
            data: { name, about, socialMediaURL: socialUrl, avatarImage }
        });
        res.json({ success: true, message: "success", data: updatedProfile });
    }
    catch (e) {
        console.error(e, "aldaa");
        res.json({ success: false });
    }
});
exports.EditProfile = EditProfile;
const updateCover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { image } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield __1.prisma.profile.findUnique({
            where: {
                userId,
            },
        });
        if (user) {
            const change = yield __1.prisma.profile.update({
                where: {
                    userId,
                },
                data: {
                    backgroundImage: image,
                },
            });
            res.json({ message: "success" });
        }
    }
    catch (e) {
        console.error(e, "aldaa");
    }
});
exports.updateCover = updateCover;
