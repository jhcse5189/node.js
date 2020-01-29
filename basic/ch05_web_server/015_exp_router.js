/* app.js */
// import express module
const express = require('express'),
      http = require('http'),
      path = require('path'),
      static = require('serve-static');

// import express middleware
const bodyParser = require('body-parser');

// creates a new router object
var router = express.Router();

// create express object
var app = express();
// set the port as attr. of app object
app.set('port', process.env.PORT || 3000);

// Using body-parser,
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

/* process req. at middlewares */
// confirm parameter at middleware
// register routing function
router.route('/process/login').post(function(req, res) {
    console.log(`process '/process/login'...`);

    req.user = 'bammer';
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write(`<h1>Response from express server's ${req.user}!</h1>`);
    res.write(`<div><p>paramId: ${paramId}</p></div>`);
    res.write(`<div><p>paramPassword: ${paramPassword}</p></div>`);
    res.write(`<br><br><a href='/public/login2.html'>Return to login page</a>`);
    res.end();
});

// register a router object to app object
app.use('/', router);

// catch 404
app.all('*', function(req, res) {
	res.status(404).send('<h1>404 Not Found</h1><hr><p>jhcse5189@gmail.com</p>');
});

// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});
