/* app.js */
// import modules
const express = require('express'),
      http = require('http'),
      path = require('path');

// import express middlewares
const bodyParser = require('body-parser'),
      static = require('serve-static'),
      expressErrorHandler = require('express-error-handler');

// creates a new router object
var router = express.Router();

// creates express object
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
// register routing function
router.route('/process/users/:id').get(function(req, res) {
    console.log(`process '/process/users/:id'...`);

    req.user = 'bammer';
    // a.k.a 'token'
    var paramId = req.params.id;

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write(`<h1>Response from express server's ${req.user}!</h1>`);
    res.write(`<div><p>paramId: ${paramId}</p></div>`);
    res.end();
});

// register a router object to app object
app.use('/', router);


// catch 404
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html',
    }
});

// after all routes, pass a 404 into next(err)
app.use(expressErrorHandler.httpError(404));
// handle all unhandled errors
app.use(errorHandler);

// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});