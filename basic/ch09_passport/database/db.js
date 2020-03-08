/**
 * db.js
 * 
 * - load DB schema
 * 
 * @date 2020-02-11
 * @author Bammer
 */

// import mongoose module
const mongoose = require('mongoose');

// add db, schema, model to db object
var database = {};

// db.init() function
database.init = function(app, config) {
    console.log(`called init()`);

    connect(app, config);
}

// connect DB & add db object as response object attr.
function connect(app, config) {
    console.log(`called connect()`);

    // connect to DB
    mongoose.Promise = global.Promise;

    // (node:25929) Deprecated collection.ensureIndex
        // mongoose.set('useCreateIndex', true);
    mongoose.connect(config.db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database.db = mongoose.connection;

    database.db.on('open', () => {
        console.log(`CONNECTED: '${config.db_url}' for MongoDB`);

        // create user schema and model obj. that defined in config file
        createSchema(app, config);
    });

    database.db.on('error', console.error.bind(console, 'mongoose connection error:)'));
    database.db.on('disconnected', () => {
        console.log('DISCONNECTED: try to connect after 2 seconds...');
        setInterval(connect, 2000);
    });
}

// create shema and model obj. that defined in config file
function createSchema(app, config) {
    console.log(`called createSchema()`);

    var schemaLen = config.db_schemas.length;
    console.log(`N of Schema in config.js: ${schemaLen}`);

    for (var i = 0; i < schemaLen; ++i) {
        var curItem = config.db_schemas[i];

        // import schemas & call createSchema()
        var curSchema = require(curItem.file).createSchema(mongoose);

        // Model definition
        var curModel = mongoose.model(curItem.collection, curSchema);

        // add as attr. to database obj.
        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
    }

    // add database attr. to app obj.
        // -> can ref. by req.app.get('database');
    app.set('database', database);
}

// assign db object to module.exports directly
module.exports = database;
