const fs = require('fs'),
      readline = require('readline');
      http = require('http');

const inname = './data.txt';
const server = http.createServer(function(req, res) {

    var test;
    const rl = readline.createInterface({
        input: fs.createReadStream(inname),
        output: test,
    });
    console.log(test);

    var instream = fs.createReadStream(inname);
    instream.pipe(res);
});

server.listen(3000, 'localhost');
