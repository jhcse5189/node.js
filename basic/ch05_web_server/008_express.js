/* app.js */

// import express module
const express = require('express'),
      http = require('http'); // must with http

// create express object
var app = express();

// set the port as attr. of app object
app.set('port', process.env.PORT || 3000);

// process req. at first middleware
app.use(function(req, res, next) {
    console.log(`process req. at first middleware`);

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.end(`<h1>Response from express server!</h1>`);
});

// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});

