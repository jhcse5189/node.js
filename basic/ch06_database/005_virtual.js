/**
 * app.js | save password in encrypted with mongoose virtual
 * 
 * - id, name columns in users3 collection
 * 
 * @data 2020-02-05
 * @author Bammer
 */

// import mongoose module
const mongoose = require('mongoose');



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

    db.on('error', console.error.bind(console, 'mongoose connection error:)'));
    db.on('open', () => {
        console.log(`CONNECTED: '${URL}' for MongoDB`);

        // create user Schema & model obj.
        createUserSchema();

        // do test
        doTest();

    });
    db.on('disconnected', connectDB);
}



// create user Schema & model obj.
function createUserSchema() {

    // Schema definition
    UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true},
        name: {type: String, index: 'hashed', default: 'unknown'},
        age: {type: Number, default: -1},
        created_at: {type: Date, index: {unique: false}, default: Date.now},
        updated_at: {type: Date, index: {unique: false}, default: Date.now},
    });

    // def. info as virtual method
    UserSchema
        .virtual('info')
        .set(function(info) {
            var splitted = info.split(' ');
            this.id = splitted[0];
            this.name = splitted[1];
            console.log(`set virtual info: ${this.id}, ${this.name}`);
        })
        .get(function() {return `${this.id} ${this.name}`});
    console.log(`define UserSchema`);

    // def. UserModel
    UserModel = mongoose.model('users3', UserSchema);
    console.log(`define UserModel`);

}



// do test
function doTest() {
    
    // create UserModel instance
    // assign info attr.
    var user = new UserModel({'info': 'test01 bammer'});

    // save()
    user.save(function(err) {
        if (err) throw err;

        console.log(`ADD: user data!`);

        findAll();
    });

    console.log(`info: ${user.id}, ${user.name}`);
}

function findAll() {
    UserModel.find({}, function(err, results) {
        if (err) throw err;

        if (results) {
            console.log(`#0 -> ${results[0]._doc.id}, ${results[0]._doc.name}`);
        }
    });
}

// call connectDB
connectDB();
