const mysql = require("mysql");
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DATABASE_URL,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 100,
  waitForConnections: true,
  multipleStatements: true,
  dateString:'date'
});

module.exports = pool;