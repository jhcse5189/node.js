const fs = require('fs'),
      http = require('http');

var server = http.createServer(function(req, res) {
    // read file and pipe with res stream
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
});
server.listen(3000, 'localhost');
