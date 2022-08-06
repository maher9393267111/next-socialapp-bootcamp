import { Server } from "socket.io";

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);

        io.on("connection", socket => {
            console.log(`  -> ${socket.id} connected`);
        
            socket.on('test', () => {
                io.emit('returnTest');
            });

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