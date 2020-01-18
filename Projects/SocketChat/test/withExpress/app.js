var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

const port = 3000,
      hostname = '52.79.251.14';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', (data) => {
        console.log(data);
    });
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
