const express = require("express");
const authenticationRoutes = express.Router();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");

authenticationRoutes.post("/user/sign-up", userController.signUp);

authenticationRoutes.post("/user/login", userController.login);


authenticationRoutes.post("/admin/login", adminController.login);


module.exports = authenticationRoutes;
