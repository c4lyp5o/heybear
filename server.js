// calling friends
const http = require('http');
const app = require('./engine/heybear');
require('dotenv').config();

// init analytics
let usercount = 0;
let userlist = [];

// init port
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

// error handler
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

// configure server
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log(`Currently istening on ${bind}. Lessgo!`);
});

// configure socket.io
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
    },
  });

io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on('joining msg', (username) => {
        // username = "Anon" + usercount;
        // socket.nickname = username;
        // userlist.push(username);
        usercount++;
        io.emit('chat message', `---${socket.id} joined the chat---`);
        io.emit('chat message', `There are ${usercount} users in the chat`);
        // io.emit('chat message', `Users: ${userlist}`);
    });
    
    socket.on('disconnect', () => {
        // if (!socket.nickname) return;
        // userlist.splice(userlist.indexOf(socket.nickname), 1);
        usercount--;
        console.log(`Client ${socket.id} disconnected`);
        io.emit('chat message', `---${socket.id} left the chat---`);
        io.emit('chat message', `There are ${usercount} users in the chat`);  
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('typing', () => {
        socket.broadcast.emit(`${socket.nickname} is typing...`);
    });
});

 // engines up
server.listen(port);