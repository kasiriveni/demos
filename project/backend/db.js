const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || "todo",
  password: process.env.DB_PASS || "todo",
  database: process.env.DB_NAME || "todo",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
