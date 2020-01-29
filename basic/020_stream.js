var fs = require('fs');

var infile = fs.createReadStream('./output.txt');
var outfile = fs.createWriteStream('./output2.txt');

infile.on('data', function(data) {
    console.log(`read: ${data}`);
    outfile.write(data);
});

infile.on('end', function() {
    console.log('terminate reading...');
    outfile.end(function() {
        console.log('terminate writing...');
    });
});
