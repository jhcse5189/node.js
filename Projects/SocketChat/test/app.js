/* Sending and receiving events */
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

const port = 3000,
      hostname = '52.79.251.14';

app.get('/', (req, res) => {
    res.end('Hi!');
});

io.on('connection', (socket) => {
    io.emit('this', {will: 'be received by everyone'});

    socket.emit('private message', (from, msg) => {
        console.log('I received a private message by ', from, ' saying ', msg);
    });
    socket.on('disconnect', () => {
        io.emit('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
