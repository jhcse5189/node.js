var io = require('socket.io')(3000);

var chat = io
  .of('/chat')
  .on('connection', (socket) => {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', (socket) => {
    socket.emit('item', { news: 'item' });
  });
