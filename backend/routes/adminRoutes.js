const express = require("express");
const AdminRoutes = express.Router();
const jwt = require("jsonwebtoken");
const adminController = require("../controllers/adminController");
const client = require("../database/databasePGSql");



AdminRoutes.post("/delete-recipe",adminController.deleteRecipe);

AdminRoutes.post("/remove-user",adminController.removeUser);

module.exports = AdminRoutes;
