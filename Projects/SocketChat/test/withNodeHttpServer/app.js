/* server */
var app = require('http').createServer(handler),
    io  = require('socket.io')(app),
    fs  = require('fs');

app.listen(3000);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
    (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);    
    });
}

io.on('connection', (socket) => {
    socket.emit('news', {hello: 'world'});
    socket.on('my other evnet', (data) => {
        console.log(data);
    });
});
