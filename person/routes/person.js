var url = require("url");
var sys = require('sys');
var logger = require('../lib/log').logger;
var conn = require('../lib/mysqldb').conn;


exports.getOne = function(req, res){

	var sql = 'select * from person where id = ' + req.params.id;
	onsole.log(sql);

	conn.query(sql, function(err, rows, field){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			return err;
		}
		res.end(JSON.stringify(rows[0]));		
	});

};

exports.getList = function(req, res){
	var sql = 'select * from person';
	logger.info(sql);
	
	conn.query(sql, function(err, rows, field){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			return err;
		}
		res.end(JSON.stringify(rows));
	});

};


exports.insert = function(req, res){
	
	var postData = '';

	req.addListener('data', function(postDataChunk){
		postData += postDataChunk;
	});

	req.addListener('end', function(){
		var person = JSON.parse(postData);
		var sql = 'insert into person(name,age) values("' + person.name + '",' + person.age + ')';
		onsole.log(sql);

		conn.query(sql, function(err, iRes){
			if(err){
				console.log('no no no !!!!!! err = ' + err);
				return err;
			}
			res.end(JSON.stringify(iRes));
		});

	});
	
};

exports.update = function(req, res){

	var id = req.params.id;
	var param = url.parse(req.url, true).query;
	var sql = 'update person set ';
	if(param.name){
		sql += ' name="' + param.name + '"';
		if(param.age)
			sql += ',';
	}
	if(param.age){
		sql += ' age=' + param.age
	}
	sql += ' where id = ' + id;
	console.log(sql);

	conn.query(sql, function(err, uRes){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			return err;
		}
		res.end(JSON.stringify(uRes));
	});

};

exports.delete = function(req, res){

	var id = req.params.id;
	var sql = 'delete from person where id = ' + id;
	onsole.log(sql);

	conn.query(sql, function(err, dRes){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			return err;
		}
		res.end(JSON.stringify(dRes));
	});

};