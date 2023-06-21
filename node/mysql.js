const mysql = require("mysql");

//连接数据库
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "w41943750",
  database: "library",
});

module.exports = db;
