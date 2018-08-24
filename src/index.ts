import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const PORT_NUMBER: string|number = process.env.PORT || 8877;
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

app.get('/', (req: express.Request, res: express.Response): void => {
    res.render('home');
});

const server = http.createServer(app);
const wss: WebSocket.Server = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket): void => {
    console.log('connected');

    ws.on('message', (message: string) => {
        console.log('received: %s', message);

        const broadcastRegex = /^broadcast\:/;

        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //send back the message to the other clients
            wss.clients
                .forEach((client: WebSocket) => {
                    if (client !== ws) {
                        client.send(`Hello, broadcast message -> ${message}`);
                    }
                });

        } else {
            ws.send(`Hello, you sent -> ${message}`);
        }
    });

    ws.send('Hi there, I am a WebSocket server');
});

server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
