
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