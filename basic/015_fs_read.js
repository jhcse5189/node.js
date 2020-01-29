var fs = require('fs');

// file read in Synchronously.
var data = fs.readFileSync('./package.json', 'utf8');
console.log(data);

// file read in Asynchronously.
fs.readFile('./package.json', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
});
console.log('read in asynchronously...'); // this log'll be executed first.
