const client = require("../database/databasePGSql");

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
