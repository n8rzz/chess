import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import SocketController from './socket.controller';

dotenv.config({ path: '.env.development' });

const PORT_NUMBER: string | number = process.env.PORT || 8877;
const app = express();

app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');
app.use(logger(process.env.LOG_FORMAT));
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

app.get('/game/:id', (req: express.Request, res: express.Response): void => {
    console.log(`gameID: ${req.params.id}`);

    res.render('game', {
        title: 'game',
        gameId: req.params.id,
        initialState: JSON.stringify({}),
    });
});
app.get('/lobby', (req: express.Request, res: express.Response): void => {
    res.render('lobby', {
        title: 'lobby',
        userList: ['Amy Adams', 'Bob Burnquist', 'Cal Clutterbuck', 'Dayna Dallas'],
    });
});
app.get('/login', (req: express.Request, res: express.Response): void => {
    res.render('login', {
        title: 'login',
    });
});
app.get('/', (req: express.Request, res: express.Response): void => {
    res.render('lobby', {
        title: 'lobby'
,    });
});

const server = http.createServer(app);
const socketController = new SocketController(server);

// const wss: WebSocket.Server = new WebSocket.Server({ server });

socketController.socket.on('connection', (ws: WebSocket): void => {
    ws.send('Connection established');

    ws.on('message', (message: string) => {
        console.log('received: %s', message);

        //send back the message to the other clients
        socketController.socket.clients.forEach((client: WebSocket) => {
            client.send(`${message}`);
        });
    });
});

server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
