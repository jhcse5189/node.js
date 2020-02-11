/**
 * app_seperated1.js | mongoose model with index & method
 *                                    with hashed password
 * 
 * seperate DB Schema and User routing function from app_seperated1.js
 * 
 * http://localhost:3000/public/login.html
 * http://localhost:3000/public/adduser.html
 * 
 * @data 2020-02-04
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

// import mongoose module
const mongoose = require('mongoose');



// create express object
var app = express();
// set the port as attr. of app obj.
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



/* Connect to DB */

const URL = 'mongodb://127.0.0.1:27017/local';

// variable for DB
var db;

function connectDB() {
    mongoose.Promise = global.Promise;
    
    // (node:25929) Deprecated collection.ensureIndex
        // mongoose.set('useCreateIndex', true);
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    db = mongoose.connection;

    db.on('open', () => {
        console.log(`CONNECTED: '${URL}' for MongoDB`);

        // create user Schema & model obj.
        createUserSchema(db);

    });
    db.on('error', console.error.bind(console, 'mongoose connection error:)'));
    db.on('disconnected', () => {
        console.log('DISCONNECTED: try to connect after 5 seconds...');
        setInterval(connectDB, 5000);
    });

    process.on('SIGINT', () => {
        //db.close(() => {
        console.log('PROCESS KILLED:)');
        process.exit(0);
        //});
    });

    // 1. add db attr. to app object
    app.set('db', db);
}

// create user Schema & model obj.
function createUserSchema(db) {

    // 2. import UserSchema
    db.UserSchema = require('./database/user_schema').createSchema(mongoose);

    // Model definition
    db.UserModel = mongoose.model('users3', db.UserSchema); // db.collection('users3');
}



/* Register routing function */

// create a new router object
var router = express.Router();

/* call routing module for ... */
const user = require('./routes/user');

// 3. /process/login
router.route('/process/login').post(user.login);

// 4. /process/adduser
router.route('/process/adduser').post(user.adduser);

// 5. /process/listuser
router.route('/process/listuser').post(user.listuser);


// register a router obj. to app obj.
app.use('/', router);



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

http.createServer(app).listen(app.get('port'), function() {
    console.log(`EXPRESS: server is running on ${app.get('port')}`);

    // call connectDB
    connectDB();
});
