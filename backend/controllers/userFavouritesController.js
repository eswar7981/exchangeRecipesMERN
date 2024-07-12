const client = require("../database/databasePGSql");


exports.getFavourites = (req, response) => {
    const query = `select * from  public."Recipe" where id in (select recipe_id from public."Favourites" where "user_id"=${req.id})`;
    client.query(query, (err, res) => {
      if (!err) {
        response.send({ favourites: res.rows });
      } else {
        console.log(err);
      }
    });
  };


  exports.addToFavourites = (req, response) => {
    const query = `insert into public."Favourites" ("user_id","recipe_id") values ('${req.id}','${req.body.recipeId}')`;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        response.json({ status: "success" });
      }
    });
  };
  