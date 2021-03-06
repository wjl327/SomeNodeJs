
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var partials = require('express-partials');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//me
var person = require('./routes/person');
var clazz = require('./routes/class');
var clazz2 = require('./routes/class2');

app.get('/', routes.index);
app.get('/api/person', person.getList);
app.get('/api/person/:id', person.getOne);
app.put('/api/person/:id', person.update);
app.delete('/api/person/:id', person.delete);
app.post('/api/person', person.insert);

app.get('/api/class', clazz.getList);
app.get('/api/class/:id', clazz.getOne);

app.get('/api/class2', clazz2.getList);
app.get('/api/class2/:id', clazz2.getOne);
app.post('/api/class2', clazz2.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
