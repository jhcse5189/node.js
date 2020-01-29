const http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(options, function(res) {
    // process response from external web server
    res.on('data', function(chunk) {
        resData += chunk;
    });

    res.on('end', function() {
        console.log(resData);
    });
});

options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = 'q=actor';
options.headers['Content-Lenght'] = req.data.length;

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(req.data);
req.end();
