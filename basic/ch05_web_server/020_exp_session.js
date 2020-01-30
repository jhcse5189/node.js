/* app.js */
// import modules
const express = require('express'),
      http = require('http'),
      path = require('path');

// import express middlewares
const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
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

// set session
app.use(session({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
}));

app.use('/public', static(path.join(__dirname, 'public')));

/* process req. at middlewares */
// register routing function
router.route('/process/login').post(function(req, res) {
    console.log(`process '/process/login'...`);

    req.admin = 'bammer';
    var paramId = req.body.id || req.query.id;
    var paramPw = req.body.password || req.query.password;

    if (req.session.user) {
        // already signed in
        console.log(`\t(redirect to '/public/product.html')`);
        res.redirect('/public/product.html');
    } else {
        // save session
        req.session.user = {
            id: paramId,
            name: 'unknown',
            authorized: true,
        };
        console.log('\t(save session / signed in)');

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(`<h1>Response from express server's ${req.admin}!</h1>`);
        res.write(`<div><p>paramId: ${paramId}</p></div>`);
        res.write(`<div><p>paramPw: ${paramPw}</p></div>`);
        res.write(`<br><br><a href='/process/product'>Move to product page</a>`);
        res.end();
    }
});

router.route('/process/logout').get(function(req, res) {
    console.log(`process '/process/logout'...`);

    if (req.session.user) {
        // already signed in, delete session
        req.session.destroy(function(err) {
            if (err) throw err;
            console.log('\t(logout / delete session)');
        });
    } else {
        // not yet signed in
        console.log('\t(unsigned in)');
    }
    res.redirect('/public/login2.html');
});

// route for product info.
router.route('/process/product').get(function(req, res) {
    console.log(`process '/process/product'...`);

    if (req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
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
