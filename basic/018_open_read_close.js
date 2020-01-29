var fs = require('fs');

fs.open('./output.txt', 'r', function(err, fd) {
    if (err) throw err;

    var buf = new Buffer(10);
    console.log(`Buffer.isBuffer(buf): ${Buffer.isBuffer(buf)}`);

    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
        if (err) throw err;

        var inStr = buffer.toString('utf8', 0, bytesRead);
        console.log(`data read: ${inStr}`);
        
        console.log(err, bytesRead, buffer);

        fs.close(fd, function() {
            console.log('opened, read and closed.');
        });
    });
});
