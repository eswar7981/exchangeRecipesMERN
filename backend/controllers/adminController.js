const client = require("../database/databasePGSql");
const bcrypt = require("bcrypt");
const { response, query } = require("express");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ userId: id }, `secretkey`);
};

exports.removeUser = (req, response) => {
  const token = req.body.token;
  const id = jwt.verify(token, "secretkey").userId;

  const queryForUser = `delete from public."User" where "id"='${id}'`;

  const queryForRecipe = `delete from public."Recipe" where "userId"='${id}'`;

  const queryForCollection = `delete from public."Collections" where "user_id"='${id}'`;

  const queryForFavourites = `delete from public."Favourites" where "user_id"='${id}'`;

  const queryForFollowing = `delete from public."Following" where "authorId"='${id}'`;

  const queryForMyRecipes = `delete from public."MyRecipes" where "user_id"='${id}'`;

  const queryForMyReviews = `delete from public."Reviews" where "user_id"='${id}'`;

  client.query(queryForUser)
  client.query(queryForRecipe);
  client.query(queryForCollection);
  client.query(queryForFavourites);
  client.query(queryForMyRecipes);
  client.query(queryForMyReviews);
  client.query(queryForFollowing)

  response.json({ status: "success" });
};

exports.login = (req, response) => {
  const { email: email, password: password } = req.body;

  const query = `select * from public."Admin" where "email"='${email}' and "password"='${password}'`;
  client.query(query, (err, res) => {
    if (!err) {
      if (res.rows.length == 1) {
        response.json({ status: "success" });
      } else {
        response.json({ status: "failed" });
      }
    } else {
      console.log(err);
      S;
    }
  });
};

exports.deleteRecipe = (req, response) => {
  const recipeId = req.body.recipeId;

  const queryForRecipe = `delete from public."Recipe" where "id"='${recipeId}'`;

  const queryForCollection = `delete from public."Collections" where "recipeId"='${recipeId}'`;

  const queryForFavourites = `delete from public."Favourites" where "recipe_id"='${recipeId}'`;

  const queryForMyRecipes = `delete from public."MyRecipes" where "recipe_id"='${recipeId}'`;

  const queryForMyReviews = `delete from public."Reviews" where "recipe_id"='${recipeId}'`;

  client.query(queryForRecipe);
  client.query(queryForCollection);
  client.query(queryForFavourites);
  client.query(queryForMyRecipes);
  client.query(queryForMyReviews);

  response.json({ status: "success" });
};
