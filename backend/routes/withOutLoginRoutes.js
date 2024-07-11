const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const searchController = require("../controllers/searchController");

router.get("/", searchController.getRecipes);

router.post("/", searchController.searchRecipe);

router.get("/details", searchController.getRecipe);

module.exports = router;
