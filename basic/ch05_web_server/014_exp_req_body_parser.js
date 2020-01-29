/* app.js */
// import express module
const express = require('express'),
      http = require('http'),
      path = require('path');

// import express middleware
const bodyParser = require('body-parser');

// create express object
var app = express();

// set the port as attr. of app object
app.set('port', process.env.PORT || 3000);

// Using body-parser,
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

/* process req. at middlewares */
// confirm parameter at middleware
app.use(function(req, res, next) {
    console.log(`process req. at first middleware`);

    req.user = 'bammer';
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write(`<h1>Response from express server's ${req.user}!</h1>`);
    res.write(`<div><p>paramId: ${paramId}</p></div>`);
    res.write(`<div><p>paramPassword: ${paramPassword}</p></div>`);
    res.end();
});

// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});
