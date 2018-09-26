// import * as express from 'express';
import * as http from 'http';
import * as SocketIo from 'socket.io';
// import * as WebSocket from 'ws';
// import PlayerController from './player/player.controller';

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
    private _socketServer: SocketIo.Server = null;
    // private _websocketServer: WebSocket.Server = null;
    // private _onMessageHandler: (msg: string) => void = this._onMessage.bind(this);
    // private _onCloseHandler: (playerId: string) => void = this._onClose.bind(this);
    // private _onUpdateClientsHandler: (msg: any) => void = this._onUpdateClients.bind(this);

    constructor(server: http.Server/*, sessionParser: any */) {
        console.log('SocketController');

        this._socketServer = SocketIo(server);
    }

    public init(): void {
        console.log('SocketController.init()');

        this._socketServer.on('connection', (socket: SocketIo.Socket): void => {
            console.log('!!! a user connected', socket.id);

            socket.on('!!! a user disconnected', (): void => {
                console.log('user disconnected');
            });
        });
    }
}
