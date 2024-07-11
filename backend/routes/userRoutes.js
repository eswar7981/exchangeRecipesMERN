const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

router.use("/", (req, res, next) => {
  const tokenBody = req.body.token;
  const tokenHeader = req.headers.token;
  if (tokenBody === undefined && tokenHeader === undefined) {
    res.json({ status: "token not working" });
  } else if (tokenBody !== undefined) {
    req.id = jwt.verify(tokenBody, "secretkey").userId;
    next();
  } else if (tokenHeader!== undefined) {
    req.id = jwt.verify(tokenHeader, "secretkey").userId;
    next();
  }
});

router.post("/create-recipe", userController.createRecipe);

router.get("/favourites", userController.getFavourites);

router.post("/add-favourite", userController.addToFavourites);

router.get("/my-recipes", userController.getMyRecipes);

router.post("/follow-author", userController.followAuthor);

router.get("/following", userController.getFollowing);

router.get("/followers", userController.getFollowers);

router.get("/get-collections", userController.getCollections);

router.post("/add-recipe-collection", userController.addARecipeIntoCollection);

router.post("/add-collection", userController.createCollection);

router.get("/get-collection-details", userController.getCollectionDetails);

module.exports = router;
