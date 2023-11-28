import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const PORT = 9000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('user-message', (message) => {
        console.log('A new message has been received:', message);

        // Broadcast the message to all connected clients
        io.emit('message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(path.resolve('./public')));

// Create a route
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
