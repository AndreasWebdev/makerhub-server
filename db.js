const config = require('./config.json');
const mysql = require('mysql');
const db = mysql.createConnection({
	host: config.mysql_host,
	user: config.mysql_user,
	password: config.mysql_pass,
	database: config.mysql_db
});

console.log('[DB] Initializing Database...');
db.connect();

module.exports = db;