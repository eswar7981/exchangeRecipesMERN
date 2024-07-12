const client = require("../database/databasePGSql");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");


exports.uploadRecipeImage = (req, response) => {
  response.json({ imageData: req.body.image });
};

exports.addReview = (req, response) => {
  const { rating: rating, review: review, recipeId: recipeId } = req.body;

  const query1 = `select "userName" from public."User" where "id"='${req.id}' `;

  client.query(query1, (err, res) => {
    if (!err) {
      const query2 = `insert into public."Reviews" ("recipe_id","rating","review","userName") values ('${recipeId}','${rating}','${review}','${res.rows[0].userName}')`;

      client.query(query2, (err, resp) => {
        if (!err) {
          response.json({ status: "success" });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
};







