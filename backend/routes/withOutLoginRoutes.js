const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const searchController = require("../controllers/searchController");


router.get('/reviews',searchController.getReviews)

router.get("/details", searchController.getRecipe);

router.get("/", searchController.getRecipes);

router.post("/", searchController.searchRecipe);



module.exports = router;
