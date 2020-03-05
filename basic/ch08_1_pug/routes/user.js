/**
 * modulize for User router function
 * 
 * @date 2020-02-08
 * @author bammer
 */

// import assert
const assert = require('assert');

// login routing function - compare to DB
let login = function(req, res) {
    console.log(`called '/process/login'`);

    // check request parameters
    var paramId = req.body.id || req.query.id,
        paramPw = req.body.pw || req.query.pw;
    console.log(`\trequest params: ${paramId}, ${paramPw}`);

    // ref. db object
    var database = req.app.get('database');

    console.dir(`test log for db.db:\n${database.db}`);

    if (database) { // if DB initialized / connected,
        authUser(database, paramId, paramPw, function(err, docs) {
            if (err) throw err;

            if (docs) { // if OK,
                console.dir(docs);

                var username = docs[0].name;

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

                // render using view template
                var context = {userid: paramId, username: username};
                req.app.render('login_success', context, function(err, html) {
                    if (err) {
                        console.log(`ERROR:) during render login process: ${err.stack}`);

                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                        res.write(`<h1>Error with login success view rendering</h1>`);
                        res.write(`<p>${err.stack}</p>`);
                        res.end();

                        return;
                    }
                    console.log(`rendered: ${html}`);
                    res.end(html);
                });

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
}

// add user routing function - add user to DB
let adduser = function(req, res) {
    console.log(`called '/process/adduser'`);

    var paramId = req.body.id || req.query.id,
        paramName = req.body.name || req.query.name;
        paramPw = req.body.pw || req.query.pw;
    console.log(`\trequest params: ${paramId}, ${paramName}, ${paramPw}`);

    // ref. db object
    var database = req.app.get('database');

    if (database) { // if DB initialized / connected,
        addUser(database, paramId, paramName, paramPw, function(err, addedUser) {
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

                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

                // render using view template
                var context = {title: 'Registerd!', username: addedUser['_doc']['name']};
                req.app.render('adduser', context, function(err, html) {
                    if (err) {
                        console.log(`ERROR:) during render adduser process: ${err.stack}`);

                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                        res.write(`<h1>Error with login success view rendering</h1>`);
                        res.write(`<p>${err.stack}</p>`);
                        res.end();

                        return;
                    }
                    console.log(`rendered: ${html}`);
                    res.end(html);
                });

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
}

// list user routing function
let listuser = function(req, res) {
    console.log(`called '/process/listuser'`);

    // ref. db object
    var database = req.app.get('database');

    if (database) { // if DB initialized / connected,
        // 1. select all users
        database.UserModel.findAll(function(err, results) {
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

                // render using view template
                var context = {results: results};
                req.app.render('listuser', context, function(err, html) {
                    if (err) {
                        console.log(`ERROR:) during render listuser process: ${err.stack}`);

                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                        res.write(`<h1>Error with login success view rendering</h1>`);
                        res.write(`<p>${err.stack}</p>`);
                        res.end();

                        return;
                    }
                    console.log(`rendered: ${html}`);
                    res.end(html);
                });

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
}


// authUser function - compare id first, pw next
var authUser = function(database, id, pw, callback) {
    console.log(`called 'authUser()' with ${id}, ${pw}`);

    database.UserModel.findById(id, function(err, results) {
        // 1. find by id
        if (err) { // if error, callback & return err obj.
            callback(err, null);
            return;
        }

        if (results.length > 0) {
            // 2. find by pw - call authenticate method from model instance
            var user = new database.UserModel({id: id});
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
var addUser = function(database, id, name, pw, callback) {
    console.log(`called 'addUser()' with ${id}, ${name}, ${pw}`);

    database.UserModel.find({'id': id}, function(err, docs) {
        assert.equal(err, null);

        if (docs.length > 0) {
            console.log(`\tCAN'T INSERTED: same 'id' detected with '${docs.length}'`);
            callback(err, null);
        } else if (pw == null) {
            console.log(`\tCAN'T INSERTED: invalid 'pw' field with '${pw}'`);
            callback(err, null);
        } else {

            // create UserModel instance
            var user = new database.UserModel({'id': id, 'name': name, 'password': pw});

            // add user with id, name, pw
            user.save(function(err, user) {
                if (err) { // if error, callback & return err obj.
                    callback(err, null);
                    return;
                }
                console.log(`\tOK: inserted a new user`);
                callback(null, user);
            });

        }
    });
}

module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;
