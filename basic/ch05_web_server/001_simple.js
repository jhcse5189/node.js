const http = require('http');

const server = http.createServer();
const host = '192.168.56.1';
const port = 3000;

//server.listen(port, function() {
server.listen(port, host, function() {
    console.log(`server is running at localhost:${port}...`);
});
