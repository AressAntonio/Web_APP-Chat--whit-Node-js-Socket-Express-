const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/templates/index.html');
});

io.on('connection', (Socket) =>{
    console.log('Un usuario se a conectado al chat');

    Socket.on('mensaje de chat', (msg) => {
        io.emit('mensaje de chat', msg);
    });

    Socket.on('disconnect', () => {
        console.log('Un usuario se a desconectado');
    });
});

server.listen(8080, ()=>{
    console.log("Activo en el puerto 8080");
});