"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const SIGNIN_controller_1 = require("../controller/user/SIGNIN-controller");
const CHECK_username_1 = require("../controller/user/CHECK-username");
const SIGNUP_controller_1 = require("../controller/user/SIGNUP-controller");
const REQUEST_otp_1 = require("../controller/user/REQUEST-otp");
const VERIFY_otp_1 = require("../controller/user/VERIFY-otp");
const VERIFY_auth_1 = require("../controller/user/VERIFY-auth");
const LOGOUT_user_1 = require("../controller/user/LOGOUT-user");
const UPDATEPASS_user_1 = require("../controller/user/UPDATEPASS-user");
const verifyToken_1 = require("../middleware/verifyToken");
require("dotenv").config();
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.post("/sign-up", SIGNUP_controller_1.signUpController);
exports.usersRouter.post("/sign-in", SIGNIN_controller_1.signInController);
exports.usersRouter.post("/:username", CHECK_username_1.checkUsername);
// Request password forgot
exports.usersRouter.post("/reset/password", REQUEST_otp_1.forgotPassword);
// otp verify bolon shine password awah endpoint
exports.usersRouter.post("/reset/change-password", VERIFY_otp_1.verifyOTP);
//settings dotroosoo passwordoo solih endpoint
exports.usersRouter.put("/update-password", verifyToken_1.verifyToken, UPDATEPASS_user_1.updatePassword);
// navigation logged in or not shalgah endpoint
exports.usersRouter.get("/verify", VERIFY_auth_1.verifyAuth);
exports.usersRouter.post("/user/logout", LOGOUT_user_1.logOutUser);
