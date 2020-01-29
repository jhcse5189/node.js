const http = require('http'),
      fs = require('fs');

// create web server object
const server = http.createServer();

const port = 3000;
const filename = './cat.png';
// run web server on port 3000
server.listen(port, function() {
    console.log(`server is running at localhost:${port}...`);
});

// process client connection event
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log(`client connected: ${addr.address}, ${addr.port}`);
});

// process client request event
server.on('request', function(req, res) {
    console.log('get client request');

    fs.readFile(filename, function(err, data) {
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.write(data);
        res.end();
    });
});

// process server close event
server.on('exit', function() {
    console.log('server exit');
});
