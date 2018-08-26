"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: '.env.development' });
const PORT_NUMBER = process.env.PORT || 8877;
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(logger(process.env.LOG_FORMAT));
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));
app.get('/', (req, res) => {
    res.render('home');
});
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    ws.send('Connection established');
    ws.on('message', (message) => {
        console.log('received: %s', message);
        //send back the message to the other clients
        wss.clients.forEach((client) => {
            client.send(`${message}`);
        });
    });
});
server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
//# sourceMappingURL=index.js.map