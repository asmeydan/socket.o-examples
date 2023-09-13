const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('submit-message', (state) => {
    console.log('submit message')
    socket.broadcast.emit('submit-message-from-server', state)
  })

  socket.on('submit-ball', (state) => {
    console.log('submit ball')
    socket.broadcast.emit('submit-ball-from-server', state)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});
