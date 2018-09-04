import * as express from 'express';
import * as http from 'http';
import * as compression from 'compression';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import SocketController from './socket.controller';
import PlayerController from './player/player.controller';
import PlayerModel from './player/player.model';

dotenv.config({ path: '.env' });

const PORT_NUMBER: string | number = process.env.PORT || 8877;
const app = express();
const MongoStore = mongo(session);
const mongoUrl = process.env.MONGODB_URI;
(mongoose as any).Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .catch((error: any) => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);

        process.exit();
});

const sessionParser = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 900000,
    },
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
        console.log(`::: PlayerId: ${req.session.playerId} found in current session`);

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
const socketController: SocketController = new SocketController(server, sessionParser);
socketController.init();

server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
