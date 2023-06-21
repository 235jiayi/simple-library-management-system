const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const router = require("./router");
const db = require("./mysql");
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-Custom-Header");
  next();
});

// app.use(express.static(__dirname + "/public/dist"));

app.use(router);

app.listen(5000, () => {
  console.log("http://127.0.0.1:5000");
});
