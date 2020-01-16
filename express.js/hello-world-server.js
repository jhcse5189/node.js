const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {

    // Build the answer
    var answer = "";
    answer += "Request URL: " + req.url + "\n";
    answer += "Request type: " + req.method + "\n";
    answer += "Request headers: " + JSON.stringify(req.headers) + "\n";

    // Main page
    if (req.url == "/") {
        res.writeHead(200, {
            'Content-type' : 'text/html' 
        });
        res.end('Hello from bammer!\n\n' + answer);
    }

    // About page
    else if (req.url == "/about") {
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        res.end('- About -\n\n' + answer);
    }

    // File not found page
    else {
        res.writeHead(404, {
            'Content-Type' : 'text/plain'
        });
        res.end('Oops, 404 NOT FOUND:)\n\n' + answer);
    }

}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
