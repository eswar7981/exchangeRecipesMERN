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


