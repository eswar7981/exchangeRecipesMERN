const client = require("../database/databasePGSql");


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
  