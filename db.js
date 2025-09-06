const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // your actual MySQL username
  password: '', // your actual MySQL password
  database: 'recipe_db'
});

module.exports = pool;
