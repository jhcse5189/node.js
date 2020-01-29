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

    var infile = fs.createReadStream(filename);
    var filelength = 0, curlength = 0;

    fs.stat(filename, function(err, stats) {
        filelength = stats.size;
        console.log(`filelength: ${filelength}`);
    });

    // write header
    res.writeHead(200, {'Content-Type': 'image/png'});

    // read from stream & write body
    infile.on('readable', function() {
        var chunk;
        while (null != (chunk = infile.read())) {
            console.log(`data read: ${chunk.length}`);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
                console.log(`wrote: ${curlength} / ${filelength}`);
                if (curlength >= filelength) {
                    // transfer response
                    console.log('end.');
                    res.end('ok');
                }
            });
        }
    });

});

// process server close event
server.on('exit', function() {
    console.log('server exit');
});
