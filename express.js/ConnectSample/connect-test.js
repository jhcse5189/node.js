const connect = require('connect'),
      http = require('http'),
      morgan = require('morgan');

const hostname = '127.0.0.1';
const port = 3000;

/* 'app.use' to add middleware function as request handler */
var app = connect();

// Logging middleware :: use 'morgan'
app.use(morgan('tiny'));
/*
app.use((req, res, next) => {
    console.log("In comes a " + req.method + " to " + req.url);
    next();
});
*/

// Main page
app.use((req, res, next) => {
    if (req.url == '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Welcome:)\n");
        // The middleware stops here
    } else {
        next();
    }
});

// About page
app.use((req, res, next) => {
    if (req.url == '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Welcome to 'about':)\n");
        // The middleware stops here
    } else {
        next();
    }
});

// 404 Error page
app.use((req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 error!\n');
});

// Send 'hello world'
app.use((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/* 
http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/
