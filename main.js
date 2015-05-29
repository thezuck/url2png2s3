/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err.stack);
});

app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// load the routes
require('./server/routes/routes')(app);

var port = app.get('port') | 3001;
http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});