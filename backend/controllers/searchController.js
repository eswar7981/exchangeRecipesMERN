const { query } = require("express");
const client = require("../database/databasePGSql");

exports.getRecipe = (req, response) => {
  const recipeId = parseInt(req.query.recipeId);
  const query = `select * from public."Recipe" where "id"=${recipeId}`;

  client.query(query, (err, res) => {
    if (!err) {
      response.send({ recipe: res.rows[0] });
    } else {
      console.log(err);
    }
  });
};

exports.getRecipes = (req, response) => {
  const category = req.query.category;

  const query = `select * from public."Recipe" where "category" Like '%${category}'`;
  client.query(query, (err, res) => {
    if (!err) {
      response.send({ recipes: res.rows });
    } else {
      console.log(err);
    }
  });
};

exports.searchRecipe = (req, response) => {

  const {
    name:name,
    category: category,
    duration: duration,
    difficultyLevel: difficultyLevel,
    ingredient: ingredient,
    preferences: preferences,
    tag: tag,
    type: type,
  } = req.body;
  const query = `select * from public."Recipe"
    where "name" Like '%${name}%' and
   "category" Like '%${category}%' and
    "duration" Like '%${duration}%' and
    "type" Like '%${type}%' and
    "keywords" Like '%${tag}%' and
   "difficulty" Like '%${difficultyLevel}%' and
    "ingredients" Like '%${ingredient}%' and
    "preferences" Like '%${preferences}%'
    `;

  client.query(query, (err, res) => {
    if (!err) {
      response.send(res.rows)
    } else {
      console.log(err);
    }
  });
};
