const express = require("express");
const authenticationRoutes = express.Router();
const adminAuthController = require("../controllers/adminAuthenticationController");
const userAuthenticationController = require("../controllers/userAuthenticationController");

authenticationRoutes.post("/user/sign-up", userAuthenticationController.signUp);

authenticationRoutes.post("/user/login", userAuthenticationController.login);

authenticationRoutes.post("/admin/login", adminAuthController.login);

module.exports = authenticationRoutes;
