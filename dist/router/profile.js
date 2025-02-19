"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const EDIT_profile_1 = require("../controller/profile/EDIT-profile");
const CREATE_profile_1 = require("../controller/profile/CREATE-profile");
const CREATOR_profile_1 = require("../controller/profile/CREATOR-profile");
const EXPLORE_profile_1 = require("../controller/profile/EXPLORE-profile");
const GET_profile_1 = require("../controller/profile/GET-profile");
const verifyToken_1 = require("../middleware/verifyToken");
exports.profileRouter = (0, express_1.Router)();
// dashboardiin profile-d zoriulsan
exports.profileRouter.get("/dashboard", verifyToken_1.verifyToken, GET_profile_1.getProfile);
exports.profileRouter.get("");
exports.profileRouter.post("/create", verifyToken_1.verifyToken, CREATE_profile_1.createProfile);
exports.profileRouter.get("/explore", EXPLORE_profile_1.searchProfileExplore);
exports.profileRouter.get("/explore/:id", CREATOR_profile_1.profileUserid);
exports.profileRouter.put("/updateCover", verifyToken_1.verifyToken, EDIT_profile_1.updateCover);
exports.profileRouter.put(`/update`, verifyToken_1.verifyToken, EDIT_profile_1.EditProfile);
