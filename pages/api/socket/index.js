import { Server } from "socket.io";

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);

        io.on("connection", socket => {
            console.log(`  -> ${socket.id} connected`);
        
            socket.on('message-send', (message) => {
                
            console.log('message received  from client ', message);

        // after receiving message from client, Send==> {emit} message to all clients

        io.emit('recive-msg', `${message} sended from socket io`);

            });

socket.on('notification',(name)=>{
    console.log('notification received  from client ', name);
    
})


            socket.on('disconnect', () => {
                console.log(`  <- ${socket.id} disconnected`);
            });
        });

        res.socket.server.io = io;
    }

    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default ioHandler;