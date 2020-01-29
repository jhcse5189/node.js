const fs = require('fs');

fs.mkdir('./docs', 0666, function(err) {
    if (err) throw err;
    console.log(`mkdir 'docs'`);

    fs.rmdir('./docs', function(err) {
        if (err) throw err;
        console.log(`rmdir 'docs'`);
    });
});
