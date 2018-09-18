import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import PlayerController from './player/player.controller';

export enum ActionTypeEnum {
    ClosedConnection = 'CLOSED_CONNECTION',
    Message = 'MESSAGE',
    NewConnection = 'NEW_CONNECTION',
    PlayerIdConfirmation = 'PLAYER_ID_CONFIRMATION',
}

export interface IAction {
    type: ActionTypeEnum;
    payload: any;
    error?: any;
    meta?: any;
}

export default class SocketController {
    private _sessionId: string = null;
    private _websocketServer: WebSocket.Server = null;
    private _onMessageHandler: (msg: string) => void = this._onMessage.bind(this);
    private _onCloseHandler: (playerId: string) => void = this._onClose.bind(this);
    private _onUpdateClientsHandler: (msg: any) => void = this._onUpdateClients.bind(this);

    constructor(server: http.Server, sessionParser: any) {
        this._websocketServer = new WebSocket.Server({
            verifyClient: (info: any, done: any) => {
                sessionParser(info.req, {} as any, () => {
                    console.log('::: Session parsed for: %s', info.req.session.id);

                    this._sessionId = info.req.session.id;

                    done(info.req.session.id);
                });
            },
            clientTracking: true,
            server,
        });
    }

    public init(): void {
        this._websocketServer.on('connection', (ws: WebSocket, req: express.Request): void => {
            console.log('::: Connection established: %s', req.session.id);

            ws.send('Connection established');

            const msg: IAction = {
                type: ActionTypeEnum.NewConnection,
                payload: PlayerController.connectedPlayers,
            };
            this._onUpdateClientsHandler(msg);

            ws.on('message', this._onMessageHandler);
            ws.on('close', () => this._onCloseHandler(req.session.id));
        });
    }

    private _onMessage(msg: string): void {
        console.log('::: received: %s', msg);

        this._onUpdateClientsHandler(msg);
    }

    private _onClose(playerId: string): void {
        console.log('!!! connection closed for %s', playerId);
        // FIXME: this appears to fire after a re-connect attempt when a user refreshes. this should be re-thought
        // PlayerController.removePlayer(playerId);

        const closeMsg: IAction = {
            type: ActionTypeEnum.ClosedConnection,
            payload: PlayerController.connectedPlayers,
        };
        this._onUpdateClientsHandler(closeMsg);
    }

    private _onUpdateClients(msg: IAction): void {
        const messageAsStr: string = JSON.stringify(msg);

        this._websocketServer.clients.forEach((client: WebSocket) => client.send(messageAsStr));
    }
}
