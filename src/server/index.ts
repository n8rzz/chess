import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const PORT_NUMBER: string|number = process.env.PORT || 8877;
const app = express();

app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');
app.use(logger(process.env.LOG_FORMAT));
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

app.get('/', (req: express.Request, res: express.Response): void => {
    res.render('home');
});

const server = http.createServer(app);
const wss: WebSocket.Server = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket): void => {
    ws.send('Connection established');

    ws.on('message', (message: string) => {
        console.log('received: %s', message);

        //send back the message to the other clients
        wss.clients.forEach((client: WebSocket) => {
            client.send(`${message}`);
        });
    });
});

server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
