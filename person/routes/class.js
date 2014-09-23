var url = require("url");
var sys = require('sys');
var logger = require('../lib/log').logger;
var conn = require('../lib/mysqldb').conn;
var Q = require('q');

exports.getOne_old = function(req, res){

	var sql = 'select * from class where id = ' + req.params.id;
	logger.info(sql);

	conn.query(sql, function(err, rows){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			return err;
		}
		var clazz = rows[0];
		var sql = 'select * from person where class = ' + clazz.id;

		conn.query(sql, function(err, rows){
			clazz.persons = rows;
			res.end(JSON.stringify(clazz));
		});

		
	});

};

var getClass = function(req, res){
	var deferred = Q.defer();
	var sql = 'select * from class where id = ' + req.params.id;
	logger.info(sql);

	conn.query(sql, function(err, rows){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			deferred.reject(err);
		}else{
			deferred.resolve(rows[0]);
		}
		
	});

	return deferred.promise;
}


exports.getOne = function(req, res){
    var clazz;
	getClass(req, res)

		.then(function(data){

			clazz = data;
			var sql = 'select * from person where class = ' + clazz.id;

			conn.query(sql, function(err, rows){
				clazz.persons = rows;
			});

	   })
	   .then(function(data){

			var sql = 'select count(*) cnt from person where class = ' + clazz.id;

			conn.query(sql, function(err, rows){
				console.log(rows);
				clazz.counts = rows[0].cnt;
				res.end(JSON.stringify(clazz));
				/*res.setHeader('Content-Type', 'application/json; charset=utf-8');
				res.send(200, data);*/
			}); 

	   })
	  .fail(function(err){
	  		console.log("response===>", err);
			var msg = {'msg': err, 'status': 'error'}
			res.send(200, msg);
	   });

};

exports.getList = function(req, res){

	var sql = "select * from class";
	logger.info(sql);

	conn.query(sql, function(err, rows){
		if(err){
			console.log('no no no !!!!!! err = ' + err);
			return err;
		}
		res.end(JSON.stringify(rows));
	});

};