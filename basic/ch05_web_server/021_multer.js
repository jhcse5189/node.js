/* app.js */
/**
 *  file upload
 * 
 * http:localhost:3000/public/cat2.png
 *  
 * @date 2020-02-02
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

// import middlewares for upload files
const multer = require('multer'),
      fs = require('fs');

// if client requests ajax, supports CORS
const cors = require('cors');



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

// open public & uploads dirs
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(cors());

// multer: (order.) body-parser -> multer -> router
// restricts up to 10 files, 1MB

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname + Date.now());
    },
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 10,
    },
});


// creates a new router object
var router = express.Router();

/* process req. at middlewares */
// register routing function

// login routing function - save session after login
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

// route for logout
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

router.route('/process/photo').get(function(req, res) {
    console.log(`process '/process/photo'...`);

    if (req.session.user) {
        res.redirect('/public/photo.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

// file routing function
router.route('/process/photo').post(upload.array('photo', 1), function(req, res) {
    console.log(`process '/process/photo'...`);

    try {
        var files = req.files;

        console.dir('# ===== Info. of the file first uploaded ===== #');
        console.dir(req.files[0]);
        console.dir('# ===== #');

        // variables for current file info.
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;

        if (Array.isArray(files)) { // if in array,
            console.log(`\tnumber of files: ${files.length}`);

            for (var index = 0; index < files.length; ++index) {
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
            }      
            
        } else { // if not in array (not a case for current settings)
            console.log('\tnumber of files: 1');

            originalname = files[index].originalname;
	    	filename = files[index].name;
	    	mimetype = files[index].mimetype;
	    	size = files[index].size;
        }

        console.log(`\tcurrent file info: ${originalname}, ${filename}, ${mimetype}, ${size}`);
    
        // send response to client
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write('<h3>Success!</h3>');
        res.write('<hr>');
        res.write(`<p>File Name: ${originalname} -> saved as: ${filename}</p>`);
        res.write(`<p>MIME Type: ${mimetype}</p>`);
        res.write(`<p>File Size: ${size}</p>`);
        res.write(`<br><br><a href='/process/product'>Move to product page</a>`);
        res.end();

    } catch (e) {
        console.dir(e.stack);
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
app.use( expressErrorHandler.httpError(404) );
// handle all unhandled errors
app.use( errorHandler );



// run express server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Express server is running on ${app.get('port')}...`);
});
