const express = require("express");
const app = express();
const bodyParser=require('body-parser')
const cors = require("cors");
const jwt = require("jsonwebtoken");
const withOutLoginRoutes = require("./routes/withOutLoginRoutes");
const client = require("./database/databasePGSql");
const userRouter = require("./routes/userRoutes");
const authRoutes=require('./routes/authenticationRoutes')
const AdminRoutes = require("./routes/adminRoutes");



client.connect();

app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.json());

app.use("/authentication",authRoutes);

app.use("/user", userRouter);

app.use("/search", withOutLoginRoutes);

app.use("/admin", AdminRoutes);

app.listen(5000);
