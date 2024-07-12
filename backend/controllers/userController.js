const client = require("../database/databasePGSql");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ userId: id }, `secretkey`);
};

exports.signUp = (req, res) => {
  const { email: email, password: password, name: name } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    const query = `insert into public."User" ("userName","email","password") Values ('${name}','${email}','${hash}')`;

    client.query(query, (err, res) => {
      if (!err) {
      } else {
        console.log(err);
      }
    });
  });
};

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

exports.login = (req, resp) => {
  const { email: email, password: password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    const query = `select * from public."User" where "email"='${email}'`;
    client.query(query, (err, res) => {
      if (!err) {
        if (res.rows.length == 0) {
          resp.json({ status: "failed" });
        } else {
          const token = generateToken(res.rows[0].id);
          console.log(token);
          resp.json({ token1: token,followers:res.rows[0].followers });
        }
      } else {
        console.log(err);
      }
    });
  });
};

exports.createCollection = (req, response) => {
  const collectionName = req.body.collectionName;
  const query = `insert into public."Collections" ("name","user_id") values ('${collectionName}','${req.id}')`;

  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ status: "success" });
    }
  });
};

exports.getCollectionDetails = (req, response) => {
  const collectionName = req.headers.name;
  const query = `select * from public."Recipe" where "id" in (select "recipeId" from public."Collections" where "name"='${collectionName}' and "recipeId" is Not Null)`;

  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ collectionDetails: res.rows });
    }
  });
};

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

exports.getMyRecipes = (req, response) => {
  const query = `select * from public."Recipe" where "userId"=${req.id}`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ myRecipes: res.rows });
    }
  });
};

exports.followAuthor = (req, response) => {
  const query1 = `select "followers" from public."User" where "id"='${req.id}'`;

  client.query(query1, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      const updatedFollowers = res.rows[0].followers + 1;
      const query2 = `update public."User" set "followers"='${updatedFollowers}' where "id"='${req.id}'`;
      client.query(query2, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          const query3 = `insert into public."Following" ("authorId","userId") values ('${req.body.author}','${req.id}')`;
          client.query(query3, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              response.json({ status: "success" });
            }
          });
        }
      });
    }
  });
};

exports.addACollection = (req, response) => {
  const collectionName = req.body.collectionName;
  const query = `insert into public."Collections" ("user_id",name,Collection) values ( )`;
};

exports.addARecipeIntoCollection = (req, response) => {
  const collectionName = req.body.collectionName;
  const recipeId = parseInt(req.body.recipeId);
  const query = `insert into public."Collections" ("user_id","name","recipeId") values ('${req.id}','${collectionName}','${recipeId}')`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ status: "success" });
    }
  });
};

exports.getCollections = (req, response) => {
  const query = `select * from public."Collections" where "user_id"='${req.id}'`;

  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ collections: res.rows });
    }
  });
};

exports.getFollowing = (req, response) => {
  const query = `select "userName","followers" from public."User" where "id" in (select "authorId" from public."Following" where "userId"=${req.id} )`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ following: res.rows });
    }
  });
};

exports.getFollowers = (req, response) => {
  const query = `select followers from public."User" where "userId"='${req.id}'`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
      response.json({ followers: res.rows[0] });
    }
  });
};

exports.createRecipe = (req, response) => {
  console.log(req.id);

  const {
    name: name,
    cuisine: cuisine,
    type: type,
    servings: servings,
    duration: duration,
    tags: tags,
    ingredients: ingredients,
    category: category,
    procedure: procedure,
    difficulty: difficulty,
    preferences: preferences,
    image: image,
  } = req.body;
  const query1 = `insert into public."Recipe" ("name","cuisine","category","servings","type","procedure","duration","keywords","ingredients","difficulty","preferences","userId","image") values('${name}','${cuisine}','${category}','${servings}','${type}','${procedure}','${duration}','${tags}','${ingredients}','${difficulty}','${preferences}','${req.id}','${image}')`;
  const query2 = `insert into public."MyRecipes" ("userId","recipe_id") values('${req.id}','rere') `;
  client.query(query1, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      response.json({ status: "success" });
    }
  });
};
