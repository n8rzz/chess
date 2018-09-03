import * as express from 'express';
import * as http from 'http';
import * as compression from 'compression';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as WebSocket from 'ws';
import * as path from 'path';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import PlayerController from './player/player.controller';
import PlayerModel from './player/player.model';

dotenv.config({ path: '.env' });

const PORT_NUMBER: string | number = process.env.PORT || 8877;
const app = express();
const MongoStore = mongo(session);

const mongoUrl = process.env.MONGODB_URI;
(mongoose as any).Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {})
    .catch((error: any) => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);

        process.exit();
});

const sessionParser = session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true,
    }),
});

app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionParser);
app.use(logger(process.env.LOG_FORMAT));
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));
app.use((req, res, next) => {
    if (!req.session.playerId) {
        const playerModel: PlayerModel = PlayerController.createPlayer();
        req.session.playerId = playerModel.id;
    } else if (!PlayerController.hasPlayer(req.session.playerId)) {
        PlayerController.createPlayerWithId(req.session.playerId);
    }

    next();
});

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
        connectedPlayers: JSON.stringify({ connectedPlayers: PlayerController.connectedPlayers }),
    });
});
app.get('/login', (req: express.Request, res: express.Response): void => {
    res.render('login', {
        title: 'login',
    });
});
app.get('/', (req: express.Request, res: express.Response): void => {
    res.render('lobby', {
        title: 'lobby',
    });
});

const server = http.createServer(app);
const wss: WebSocket.Server = new WebSocket.Server({
    verifyClient: (info: any, done: any) => {
        console.log('::: Parsing session');

        sessionParser(info.req, {} as any, () => {
            console.log('::: Session parsed for: %s', info.req.session.playerId);

            done(info.req.session.playerId);
        });
    },
    clientTracking: true,
    server,
});

wss.on('connection', (ws: WebSocket, req: express.Request): void => {
    console.log('::: Connection established: %s', req.session.playerId);

    ws.send('Connection established');

    wss.clients.forEach((client: WebSocket) => {
        const msg: any = {
            type: 'NEW_CONNECTION',
            payload: PlayerController.connectedPlayers,
        };
        client.send(JSON.stringify(msg));
    });

    ws.on('message', (message: string) => {
        console.log('::: received: %s', message);

        wss.clients.forEach((client: WebSocket) => {
            client.send(`${message}`);
        });
    });

    ws.on('close', () => {
        console.log('!!! connection closed for %s', req.session.playerId);
        // FIXME: this appears to fire after a re-connect attempt when a user refreshes. this should be re-thought
        // PlayerController.removePlayer(req.session.playerId);

        // wss.clients.forEach((client: WebSocket) => {
        //     const msg: any = {
        //         type: 'CLOSED_CONNECTION',
        //         payload: PlayerController.connectedPlayers,
        //     };
        //     client.send(JSON.stringify(msg));
        // });
    });
});

server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
