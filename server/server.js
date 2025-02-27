const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

let clients = new Set();


wss.on('connection' , ( ws) =>{
    console.log('Yay! I am connected!');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`You sent -> ${message}`);
    });

    clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });

    
    ws.on('close', () => {
        console.log("User disconnected");
        clients.delete(ws);
    });

})  

const PORT = 4000;
server.listen(PORT, () => console.log(`WebSocket server running on port ${PORT}`));