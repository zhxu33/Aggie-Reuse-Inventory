const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.dbport,
  database: process.env.database,
});

pool.query("SELECT 1", (error) => {
  if (error) throw error;
  console.log("Connected to database!");
});

pool.query("SELECT * FROM items", (error) => {
  if (error) throw error;
  console.log("items table found!");
});

module.exports = pool;
