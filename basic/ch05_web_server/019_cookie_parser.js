/* app.js */
// import modules
const express = require('express'),
      http = require('http'),
      path = require('path');

// import express middlewares
const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
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

// set cookie-parser -> can access req.cookies
app.use(cookieParser());

app.use('/public', static(path.join(__dirname, 'public')));

/* process req. at middlewares */
// register routing function
router.route('/process/showCookie').get(function(req, res) {
    console.log(`process '/process/showCookie'...`);

    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req, res) {
    console.log(`process '/process/setUserCookie'...`);

    // set cookie
    res.cookie('user', {
        id: 'jhcse5189',
        name: 'bammer',
        authorized: true,
    });

    // response by redirecting
    res.redirect('/process/showCookie');
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
