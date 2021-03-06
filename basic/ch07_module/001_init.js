/**
 * app.js | mongoose model with index & method
 *                         with hashed password
 * 
 * http://192.168.35.26:3000/public/login.html
 * http://192.168.35.26:3000/public/adduser2.html
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

// import bcrypt module
const bcrypt = require('bcrypt'),
      saltRounds = 10;

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

const URL = 'mongodb://127.0.0.1:27017/local';

// variable for DB, Schema, Model obj.
var db, UserSchema, UserModel;

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
        createUserSchema();

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
}

// create user Schema & model obj.
function createUserSchema() {

    // Schema definition
    UserSchema = mongoose.Schema({
        id: {type: String, require: true, unique: true, default: ''},
        name: {type: String, index: 'hashed', default: ''},
        hashed_password: {type: String, require: true, default: ''},
        salt: {type: String, required: true},
        age: {type: Number, default: -1},
        created_at: {type: Date, index: {unique: false}, default: Date.now},
        updated_at: {type: Date, index: {unique: false}, default: Date.now},
    });

    UserSchema
        .virtual('password')
        .set(function(password) {
            console.log(`called set in virtual password method`);
            this._password = password;
            this.salt = this.makeSalt(saltRounds);
            this.hashed_password = this.encrytPassword(password, this.salt);
        })
        .get(function() {
            console.log(`called get in virtual password method`);
            return this._password;
        });

    // makeSalt method
    UserSchema.method('makeSalt', function(saltRounds) {

        var _salt = bcrypt.genSaltSync(saltRounds);
        console.log(`\t_salt: ${_salt}`);
        return _salt;
    });

    // encrytPassword method
    UserSchema.method('encrytPassword', function(plainText, salt) {

        var _hash = bcrypt.hashSync(plainText, salt);
        console.log(`\t_hash: ${_hash}`);
        return _hash;
    });

    // authenticate method
    UserSchema.method('authenticate', function(plainText, ciphertext) {

        var _tf = bcrypt.compareSync(plainText, ciphertext);
        console.log(`\t_tf: ${_tf}`);
        return _tf;
    });

    // check is value is validated
    var validatePresenceOf = function(value) {
        return value && value.length;
    };


    // define mongoose middleware that trigger on save event
    UserSchema.pre('save', function() {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.password)) {
            next(new Error(`invalid 'password' field.`));
        } else {
            next();
        }
    });


    // check is validated for required attr.
    UserSchema.path('id').validate(function (id) {
        return id.length;
    }, `'id' column's value is empty.`);

    UserSchema.path('name').validate(function (name) {
        return name.length;
    }, `'name' column's value is empty.`);

    UserSchema.path('hashed_password').validate(function (hashed_password) {
        return hashed_password.length;
    }, `'hashed_password' column's value is empty.`);


    // add findById, findAll method to schema as static
    UserSchema.static('findById', function(id, callback) {
        return this.find({id: id}, callback);
    });
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback);
    });

    // Model definition
    UserModel = mongoose.model('users3', UserSchema); // db.collection('users3');
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


    if (db) { // if DB initialized / connected,
        authUser(db, paramId, paramPw, function(err, docs) {
            if (err) throw err;

            if (docs) { // if OK,
                console.dir(docs);

                var username = docs[0].name;

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h1>Success | login</h1>`);
                res.write(`<div><p>User ID: ${paramId}</p></div>`);
                res.write(`<div><p>User Name: ${username}</p></div>`);
                res.write(`<br><br><a href='/public/login.html'>Login Others</a>`);
                res.write(`<br><a href='/public/listuser.html'>List Users</a>`);
                res.end();

            } else { // if NOT FOUND,
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h1>Fail | login</h1>`);
                res.write(`<div><p>Confirm with your account again:)</p></div>`);
                res.write(`<br><br><a href='/public/login.html'>Login Others</a>`);
                res.end();
            }
        });
    } else { // else DB uninitialized / disconnected,
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(`<h2>DB Disconnected</h2>`);
        res.write(`<div><p>Can't connect to MongoDB</p><div>`);
        res.end();
    }

});

// add user routing function - add user to DB
router.route('/process/adduser').post(function(req, res) {
    console.log(`called '/process/adduser'`);

    var paramId = req.body.id || req.query.id,
        paramName = req.body.name || req.query.name;
        paramPw = req.body.pw || req.query.pw;
    console.log(`\trequest params: ${paramId}, ${paramName}, ${paramPw}`);

    if (db) { // if DB initialized / connected,
        addUser(db, paramId, paramName, paramPw, function(err, addedUser) {
            if (err) {
                console.log(`\tERROR: when calling '/process/adduser'`);
                console.log(err.stack);

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write('<h2>ERROR with adduser</h2>');
                res.write(`<p>${err.stack}</p>`);
                res.end();

                return;
            }

            if (addedUser) { // if OK,
                console.dir(addedUser);

                var username = addedUser['_doc']['name'];

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

// list user routing function
router.route('/process/listuser').post(function(req, res) {
    console.log(`called '/process/listuser'`);

    if (db) { // if DB initialized / connected,
        // 1. select all users
        UserModel.findAll(function(err, results) {
            if (err) {
                console.error(`\tLIST ERROR: ${err.stack}`);

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write('<h2>Error: while listing users</h2>');
                res.write(`<p>${err.stack}</p>`);
                res.end();

                return;
            }

            if (results) {
                console.dir(results);

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write('<h2>User list</h2>');
                res.write('<div><ul>');

                for (var i = 0; i < results.length; ++i) {
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write(`<li>#${i}: ${curId}, ${curName}</li>`);
                }

                res.write('</ul></div>');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                res.write(`<h2>DB Disconnected</h2>`);
                res.write(`<div><p>Can't connect to MongoDB</p><div>`);
                res.end();
            }
        });
        
    } else { // else DB uninitialized / disconnected,
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(`<h2>DB Disconnected</h2>`);
        res.write(`<div><p>Can't connect to MongoDB</p><div>`);
        res.end();
    }

});



// register a router obj. to app obj.
app.use('/', router);

// authUser function - compare id first, pw next
var authUser = function(db, id, pw, callback) {
    console.log(`called 'authUser()' with ${id}, ${pw}`);

    UserModel.findById(id, function(err, results) {
        // 1. find by id
        if (err) { // if error, callback & return err obj.
            callback(err, null);
            return;
        }

        if (results.length > 0) {
            // 2. find by pw - call authenticate method from model instance
            var user = new UserModel({id: id});
            var authenticated = user.authenticate(pw, results[0]._doc.hashed_password);

            if (authenticated) {
                console.log(`\tOK: found user with ${id}, ${pw}`);
                callback(null, results);
            } else {
                console.log(`\tNOT FOUND: not found user`);
                callback(null, null);
            }
        } else {
            console.log(`\tNOT FOUND: not found user`);
            callback(null, null);
        }
    });

}

// addUser function
var addUser = function(db, id, name, pw, callback) {
    console.log(`called 'addUser()' with ${id}, ${name}, ${pw}`);

    UserModel.find({'id': id}, function(err, docs) {
        assert.equal(err, null);

        if (docs.length > 0) {
            console.log(`\tCAN'T INSERTED: same 'id' detected with '${docs.length}'`);
            callback(err, null);
        } else if (pw == null) {
            console.log(`\tCAN'T INSERTED: invalid 'pw' field with '${pw}'`);
            callback(err, null);
        } else {

            // create UserModel instance
            var user = new UserModel({'id': id, 'name': name, 'password': pw});

            // add user with id, name, pw
            user.save(function(err, addedUser) {
                if (err) { // if error, callback & return err obj.
                    callback(err, null);
                    return;
                }
                console.log(`\tOK: inserted a new user`);
                callback(null, addedUser);
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
