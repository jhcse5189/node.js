/**
 * app.js | adjust local auth. using passport mudule
 * 
 * http://localhost:3000/public/login.html
 * http://localhost:3000/public/adduser.html
 * 
 * @data 2020-03-09
 * @author Bammer
 */

// import express modules
const express = require('express'),
      http = require('http'),
      path = require('path');

// import express middlewares
const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      static = require('serve-static'),
      expressErrorHandler = require('express-error-handler');

// import passport modules
const passport = require('passport'),
      flash = require('connect-flash');



// (1). import config.js
var config = require('./config');

// (2). import database.js
var database = require('./database/db');

// (3). import route_loader.js
var route_loader = require('./routes/route_loader');



// create express object
var app = express();

// set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
console.log(`set 'view engine' as 'pug'`);

// set the port as attr. of app obj.
console.log(`config.server_port: ${config.server_port}`);
app.set('port', process.env.PORT || 3000);



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// set cookie-parser -> can access req.cookies
app.use(cookieParser());

// set session
app.use(session({
    secret: 'bammer-key',
    resave: true,
    saveUninitialized: true,
}));

// open public dirs
app.use('/public', static(path.join(__dirname, 'public')));



// (4). load routing info. and set
route_loader.init(app, express.Router());



// passport usage setting
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



/* catch 404*/

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html',
    }
});

// after all routes, pass a 404 into next(err)
app.use( expressErrorHandler.httpError(404) );
// handle all unhandled errors
app.use( errorHandler );



/* Run express server */

process.on('SIGINT', () => {
    console.log('PROCESS KILLED:)');
    process.exit(0);
});

/*
app.on('close', () => {
    console.log(`CLOSE EXPRESS SERVER:)`);
    if (database.db) {
        database.db.close();
    }
});
*/

http.createServer(app).listen(app.get('port'), function() {
    console.log(`EXPRESS: server is running on ${app.get('port')}`);

    // init DB
    database.init(app, config);
});
