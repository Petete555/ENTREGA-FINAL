var  mysql = require("mysql");
var {createPool} = require("mysql2")
var util = require("util");

//creamos conexion con la DB mediante los datos pasados en el  archivo .env
var pool = createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});

pool.query = util.promisify(pool.query);

module.exports = pool;