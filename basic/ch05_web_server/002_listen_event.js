const http = require('http');

// create web server object
const server = http.createServer();

const port = 3000;
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
    //console.dir(req);

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Response page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Hello client!</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
});

// process server close event
server.on('exit', function() {
    console.log('server exit');
});
