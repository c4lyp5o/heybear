const http = require('http');
const app = require('./engine/heybear');
require('dotenv').config();

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

const port = normalizePort( process.env.PORT || '8000');

function errorHandler(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.on('joining msg', (username) => {
        socket.nickname = username;
        io.emit('chat message', `---${socket.nickname} joined the chat---`);
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('chat message', `---${socket.nickname} left the chat---`);
      
    });
    socket.on('chat message', (msg) => {
      socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
    });
  });

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log(`Currently istening on ${bind}. Lessgo!`);
});

server.listen(port);