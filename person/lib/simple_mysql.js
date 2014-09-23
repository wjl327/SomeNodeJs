var mysql = require('mysql');
var mysql_config = require('../conf/config.json').mysql;

var conn = mysql.createConnection(mysql_config);

conn.connect();

exports.conn = conn;
