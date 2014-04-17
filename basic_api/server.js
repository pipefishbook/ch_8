var http = require('http');
var express = require('express');
var app = express();
var url = require('url');
var proxy = require('proxy-middleware');
var logger = require('morgan');

app.use(logger({ immediate: true, format: 'dev' }));
app.use('/api', proxy(url.parse('http://0.0.0.0:5001/api/')));

app.use(express.static(__dirname + '/static'));


var port = 5000;
http.createServer(app).listen(port, function() {
  console.log('Frontend listening at %s', port);
});
