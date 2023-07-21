const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const server = http.createServer(app);

app.use(cors());
let elements = [];

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  io.to(socket.id).emit('whiteboard-state', elements);
  console.log(`Clinet ${socket.id} connected`);
  socket.on('element-update', (elementDate) => {
    updateElementInElements(elementDate);
    socket.broadcast.emit('element-update', elementDate);
  });

  socket.on('whiteboard-clear', () => {
    elements = [];
    socket.broadcast.emit('whiteboard-clear');
  });
  socket.on('cursor-position', (cursorData) => {
    socket.broadcast.emit('cursor-position', {
      ...cursorData,
      userId: socket.id,
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', socket.id);
  });
});

app.get('/', function (req, res) {
  res.send('Welcome');
});
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('listening on port: ' + port);
});

const updateElementInElements = (elementDate) => {
  const index = elements.findIndex((e) => e.id === elementDate.id);

  if (index === -1) {
    return elements.push(elementDate);
  }
  elements[index] = elementDate;
};
