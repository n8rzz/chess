import * as express from 'express';
import * as http from 'http';
import * as compression from 'compression';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as passport from 'passport';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';
import SocketController from './socket.controller';
import {AuthRouteController} from './auth/auth-route.controller';
import {passportConfigurator} from './auth/passport-configurator';
import {hasAuthMiddleware} from './auth/has-auth.middleware';
import {RoutePathEnum} from './config/route-path.enum';
import {ProfileRouteController} from './profile/profile-route.controller';

dotenv.config({ path: '.env' });

const PORT_NUMBER: string | number = process.env.PORT || 8877;

const app = express();
const MongoStore = mongo(session);
const mongoUrl = process.env.MONGODB_URI;
(mongoose as any).Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoUrl)
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

passportConfigurator(passport);

app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionParser);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger(process.env.LOG_FORMAT));
app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (!req.session.token || !req.session.playerId) {
        return next();
    }

    next();
});
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

// rotues
app.use(RoutePathEnum.Root, AuthRouteController);
app.use(RoutePathEnum.Profile, ProfileRouteController);

app.get(RoutePathEnum.GameSingle, [hasAuthMiddleware], (req: express.Request, res: express.Response): void => {
    console.log(`gameID: ${req.params.id}`);

    res.render('game', {
        title: 'game',
        gameId: req.params.id,
        initialState: JSON.stringify({}),
    });
});

app.get(RoutePathEnum.Lobby, [hasAuthMiddleware], (req: express.Request, res: express.Response): void => {
    res.render('lobby', {
        title: 'lobby',
        playerId: req.session.playerId,
        connectedPlayers: JSON.stringify({ connectedPlayers: [] }),
    });
});

app.get(RoutePathEnum.Root, [hasAuthMiddleware], (req: express.Request, res: express.Response): void => {
    res.render('lobby', {
        title: 'lobby',
        playerId: req.session.playerId,
        connectedPlayers: JSON.stringify({ connectedPlayers: [] }),
    });
});

const server = http.createServer(app);
const socketController: SocketController = new SocketController(server, sessionParser);
socketController.init();

server.listen(PORT_NUMBER, () => {
    console.log(`Server started on port: ${PORT_NUMBER}`);
});
