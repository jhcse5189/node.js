/* app.js */

// import express module
const express = require('express'),
      http = require('http'); // must with http

// create express object
var app = express();

// set the port as attr. of app object
app.set('port', process.env.PORT || 3000);

/* process req. at middlewares */
app.use(function(req, res, next) {
    console.log(`process req. at first middleware`);

    res.send(
        {
            name: 'bammer',
            age: 22
        }
    );
});

// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});
