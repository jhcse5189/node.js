const express = require('express'),
      http    = require('http'),
      morgan = require('morgan');

const hostname = '127.0.0.1';
const port = 3000;

var app = express();

app.use(morgan('tiny'));

app.all("*", (req, res, next) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});

// 'app.get' for routing
app.get('/', (req, res) => {
    res.end("Welcome:)\n");
});

app.get('/about', (req, res) => {
    res.end("Welcome to 'about':)\n");
});

app.get('/hi/:user', (req, res) => {
    res.end("Hi, " + req.params.user + "!");
});

app.get("*", (req, res) => {
    res.end("404 error!\n");
});

http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
