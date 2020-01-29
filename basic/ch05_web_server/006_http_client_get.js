const http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res) {
    // process response from external web server
    var resData = '';
    res.on('data', function(chunk) {
        resData += chunk;
    });

    res.on('end', function() {
        console.log(resData);
    });
});

req.on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
