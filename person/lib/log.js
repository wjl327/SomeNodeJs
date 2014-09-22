var log4js = require('log4js');

log4js.configure({
	appenders:[
		{ type: 'console' }, 
		{
			type: 'dateFile',
			filename: 'logs/access.log',
      		pattern: "_yyyy-MM-dd hh",
      		alwaysIncludePattern: false,
			category: 'dateFileLog'
		},
	],
	replaceConsole: true,   //替换console.log
  	levels:{
    	dateFileLog: 'INFO'
  	}
});

var dateFileLog = log4js.getLogger('dateFileLog'); 

exports.logger = dateFileLog;  

/*
exports.logger=function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
};
*/

exports.use = function(app) {
  //页面请求日志,用auto的话,默认级别是WARN
  app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
};