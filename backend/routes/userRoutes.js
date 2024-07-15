const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userFollowingController = require("../controllers/userFollowingController");
const userFavouritesController = require("../controllers/userFavouritesController");
const userController = require("../controllers/userController");
const userRecipesController = require("../controllers/userRecipesController");
const userCollectionController = require("../controllers/userCollectionController");

router.use("/", (req, res, next) => {
  const tokenBody = req.body.token;
  const tokenHeader = req.headers.token;
  if (tokenBody === undefined && tokenHeader === undefined) {
    res.json({ status: "token not working" });
  } else if (tokenBody !== undefined) {
    req.id = jwt.verify(tokenBody, "secretkey").userId;
    next();
  } else if (tokenHeader !== undefined) {
    req.id = jwt.verify(tokenHeader, "secretkey").userId;
    next();
  }
});
router.post("/create-recipe", userRecipesController.createRecipe);

router.post("/review", userController.addReview);

router.post("/upload-image", userController.uploadRecipeImage);

router.get("/favourites", userFavouritesController.getFavourites);

router.post("/add-favourite", userFavouritesController.addToFavourites);

router.get("/my-recipes", userRecipesController.getMyRecipes);

router.post("/follow-author", userFollowingController.followAuthor);

router.get("/following", userFollowingController.getFollowing);

router.get("/followers", userFollowingController.getFollowers);

router.get("/get-collections", userCollectionController.getCollections);

router.post(
  "/add-recipe-collection",
  userCollectionController.addARecipeIntoCollection
);

router.get("/searchAuthorRecipes",userCollectionController.getAuthorRecipes)

router.post("/add-collection", userCollectionController.createCollection);

router.get(
  "/get-collection-details",
  userCollectionController.getCollectionDetails
);

module.exports = router;
