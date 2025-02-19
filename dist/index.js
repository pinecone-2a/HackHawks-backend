"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const bankCardRouter_1 = require("./router/bankCardRouter");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const client_1 = require("@prisma/client");
const usersRouter_1 = require("./router/usersRouter");
const cors_1 = __importDefault(require("cors"));
const donations_1 = require("./router/donations");
const profile_1 = require("./router/profile");
const verifyToken_1 = require("./middleware/verifyToken");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dashboard_1 = require("./router/dashboard");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["https://hackhawks-frontend.vercel.app", "http://localhost:3000"],
    credentials: true,
}));
exports.prisma = new client_1.PrismaClient();
// bank card backend endpoint ///
app.use("/bank-card", verifyToken_1.verifyToken, bankCardRouter_1.bankCardRouter);
// profiel backend endpoint //
app.use("/profile", profile_1.profileRouter);
// user/auth backend endpoint //
app.use("/auth", usersRouter_1.usersRouter);
// donation backend endpoint //
app.use("/donation", donations_1.donationRouter);
// logged useriin dashboard handah heseg
app.use("/dashboard", verifyToken_1.verifyToken, dashboard_1.signedUserRouter);
// ene hesgiig bitgii oroldooroi hend ch hereggu heseg shvv//
app.listen(PORT, () => {
    console.log(`it's on http://localhost:${PORT}`);
});
