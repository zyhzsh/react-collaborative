const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');

const server = http.createServer(app);

app.use(cors());
let elements = [];
let clients = [];

const wss = new WebSocket.Server({ server, clientTracking: true });

wss.on('connection', (socket) => {
  const socketId =
    socket._socket.remoteAddress + ':' + socket._socket.remotePort;
  console.log(`Client ${socketId} connected`);

  clients.push(socketId);
  console.log(`Current number of client connected ${clients.length}`);

  // Send the current whiteboard state to the newly connected client
  socket.send(JSON.stringify({ event: 'whiteboard-state', payload: elements }));

  socket.on('message', (data) => {
    const parsedData = JSON.parse(data);

    switch (parsedData.event) {
      case 'element-update':
        updateElementInElements(parsedData.payload);
        broadcast(socket, {
          event: 'element-update',
          payload: parsedData.payload,
        });
        break;
      case 'whiteboard-clear':
        elements = [];
        broadcast(socket, { event: 'whiteboard-clear' });
        break;
      case 'cursor-position':
        broadcast(socket, {
          event: 'cursor-position',
          payload: { ...parsedData.payload, userId: socketId },
        });
        break;
    }
  });

  socket.on('close', () => {
    console.log(`Client ${socketId} disconnected`);
    clients = clients.filter((client) => client !== socketId);
    console.log(`Current number of client connected ${clients.length}`);
    broadcast(socket, { event: 'user-disconnected', payload: socketId });
  });
});

app.get('/', function (req, res) {
  res.send('Welcome');
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('listening on port: ' + port);
});

const broadcast = (senderSocket, message) => {
  wss.clients.forEach((client) => {
    if (client !== senderSocket && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

const updateElementInElements = (elementData) => {
  const index = elements.findIndex((e) => e.id === elementData.id);

  if (index === -1) {
    return elements.push(elementData);
  }
  elements[index] = elementData;
};
