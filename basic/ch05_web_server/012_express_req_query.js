/* app.js */

// import express module
const express = require('express'),
      http = require('http'); // must with http

// create express object
var app = express();

// set the port as attr. of app object
app.set('port', process.env.PORT || 3000);

/* process req. at middlewares */
app.use(function(req, res, next) {
    console.log(`process req. at first middleware`);
    
    var userAgent = req.header('User-Agent');
    // localhost:3000/?name=zip
    var paramName = req.query.name;
    req.user = 'bammer';

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write(`<h1>Response from express server's ${req.user}!</h1>`);
    res.write(`<div><p>User-Agent: ${userAgent}</p></div>`);
    res.write(`<div><p>Param Name: ${paramName}</p></div>`);
    res.end();
});

// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});
