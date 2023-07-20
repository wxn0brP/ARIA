const socket_io = require("socket.io");
var io;

function start(server){
    io = socket_io(server, {
        cors: {
            origin: "*"
        }
    });
    io.of("/").on("connection", (socket) => {
        socket.on("msg", (msg) => {
            msg = msg.trim().replaceAll("\n"," ");
            speak(msg);
        })
    });
}

function sendToSocket(data){
    var map = io.of("/").sockets;
    map.forEach(e => {
        e.emit("msg", data);
    });
}

module.exports = {
    start, sendToSocket
};