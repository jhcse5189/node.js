/**
 * app.js | add user to MongoDB
 * 
 * http://192.168.35.26:3000/public/adduser.html
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

// import assert
const assert = require('assert');

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

const url = 'mongodb://127.0.0.1:27017',
      dbName = 'local';

// import mongob module
const MongoClient = require('mongodb').MongoClient,
      client = new MongoClient(url);

// variable for DB obj.
var database;
// connect to MongoDB
function connectDB() {
    client.connect(function(err) {
        if (err) throw err;

        console.log(`CONNECTED: '${url}' for MongoDB`);
        const db = client.db(dbName);

        //assert.equal(db, client.db(dbName));
        database = db;
    });
}



/* Register routing function */

// create a new router object
var router = express.Router();

// login routing function - compare to DB
router.route('/process/login').post(function(req, res) {
    console.log(`called '/process/login'`);

    // check request parameters
    var paramId = req.body.id || req.query.id,
        paramPw = req.body.pw || req.query.pw;
    console.log(`\trequest params: ${paramId}, ${paramPw}`);


    if (database) { // if DB initialized / connected,
        authUser(database, paramId, paramPw, function(err, docs) {
            if (err) throw err;

            if (docs) { // if OK,
                console.dir(docs);

                var username = docs[0].name;

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h1>Success | login</h1>`);
                res.write(`<div><p>User ID: ${paramId}</p></div>`);
                res.write(`<div><p>User Name: ${username}</p></div>`);
                res.write(`<br><br><a href='/public/login.html'>Login Others</a>`);
                res.end();

            } else { // if NOT FOUND,
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h1>Fail | login</h1>`);
                res.write(`<div><p>Confirm with your account again:)</p></div>`);
                res.write(`<br><br><a href='/public/login.html'>Login Others</a>`);
                res.end();
            }
        });
    } else { // else DB disconnected,
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write();
        res.write();
        res.end();
    }

});

// add user routing function - add user to DB
router.route('/process/adduser').post(function(req, res) {
    console.log(`called '/process/adduser`);

    var paramId = req.body.id || req.query.id,
        paramName = req.body.name || req.query.name;
        paramPw = req.body.pw || req.query.pw;
    console.log(`\trequest params: ${paramId}, ${paramName}, ${paramPw}`);

    if (database) { // if DB initialized / connected,
        addUser(database, paramId, paramName, paramPw, function(err, result) {
            if (err) throw err;

            if (result && result.insertedCount > 0) { // if OK,
                console.dir(result);

                var username = result['ops'][0]['name'];

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h1>Success | Add User</h1>`);
                res.write(`<div><p>Added user with name '${username}'</p></div>`);
                res.write(`<br><br><a href='/public/login.html'>Login Others</a>`);
                res.end();

            } else { // if NOT INSERTED,
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h1>Fail | Add User</h1>`);
                res.write(`<div><p>Error with adding new user to DB:)</p></div>`);
                res.write(`<br><br><a href='/public/login.html'>Login Others</a>`);
                res.end();
            }
        });
    } else { // else DB disconnected,
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(`<h2>DB Disconnected</h2>`);
        res.write(`<div><p>Can't connect to MongoDB</p><div>`);
        res.end();
    }
});

// register a router obj. to app obj.
app.use('/', router);

// authUser function
var authUser = function(database, id, pw, callback) {
    console.log(`called 'authUser()' with ${id}, ${pw}`);

    // ref. users collection
    var users = database.collection('users');

    // find with id & pw
    users.find({'id': id, 'pw':pw}).toArray(function(err, docs) {
        if (err) { // if error, callback & return err obj.
            callback(err, null);
            return;
        }

        if (docs.length > 0) {
            console.log(`\tOK: found user with ${id}, ${pw}`);
            callback(null, docs);
        } else {
            console.log(`\tNOT FOUND: not found user`);
            callback(null, null);
        }
    });
}

// addUser function
var addUser = function(database, id, name, pw, callback) {
    console.log(`called 'addUser()' with ${id}, ${name}, ${pw}`);

    // ref. users collection
    var users = database.collection('users');

    users.find({'id': id}).toArray(function(err, docs) {
        assert.equal(err, null);

        if (docs.length > 0) {
            console.log(`\tCAN'T INSERTED: same 'id' detected with '${docs.length}'`);
            callback(err, null);
        } else {
            // add user with id, name, pw
            users.insertMany([{'id': id, 'name': name, 'pw': pw}], function(err, result) {
                    
                if (err) { // if error, callback & return err obj.
                    callback(err, null);
                    return;
                }

                if (result.insertedCount > 0) {
                    console.log(`\tOK: inserted '${result.insertedCount}' user`);
                } else {
                    console.log(`\tNOT INSERTED:`);
                }
                callback(null, result);
            });
        }
    });
}



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
