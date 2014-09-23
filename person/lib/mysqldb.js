var mysql = require('mysql');

var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'test',
	password:'123456',
	port:3306
});

conn.connect();

exports.conn = conn;
