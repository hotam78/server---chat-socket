const express = require('express');
const app = express();
const {createServer}  = require('http');
const httpServer = createServer(app);
const {Server}  = require('socket.io');
const cors = require('cors');
app.use(cors());

const io = new Server(httpServer, {
    cors: { origin: ['http://localhost:5175', 'http://127.0.0.1:5175']}
});


io.on('connection', (socket) => {
    console.log('id user connected:', socket.id);

    socket.on('msg', (data) => {
        console.log('message: ' + data + 'ץ id:' + socket.id);
        socket.emit('recivedMsg', data)
        // 
      });
      
    socket.on('disconnect', () => {
      console.log('user disconnected');
      socket.emit('resForDis','you disconnect!');
    });
  });




httpServer.listen(3000, () => {
    console.log('***Server 3000 is running***');
});
