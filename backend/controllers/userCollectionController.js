const client = require("../database/databasePGSql");


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


  exports.addACollection = (req, response) => {
    const collectionName = req.body.collectionName;
    const query = `insert into public."Collections" ("user_id",name,Collection) values ( )`;
    
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