var fs = require('fs');

// file write
fs.writeFile('./output.txt', 'Hello Node!', function(err) {
    if (err) throw err;
    console.log('writed.');
});
