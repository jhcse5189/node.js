var mongoose = require('mongoose');

var URL = 'mongodb://localhost/test';

exports.connect = () => {
    // get the databases connection pool
    mongoose.connect(URL, {useNewUrlParser: true});
    var db = mongoose.connection;

    db.on('connected', () => {
        console.log('connected: ' + URL);
    });
    db.on('error', console.error.bind(console, 'mongoose connection error:)'));
    db.on('disconnected', () => {
        console.log('disconnected:');
    });

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('closing...');
            process.exit(0);
        });
    });
};
