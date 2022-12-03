require("dotenv").config();
const connectToDB = require("./config/database");
const express = require("express");
const route = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.use("/", route);

module.exports = app;
