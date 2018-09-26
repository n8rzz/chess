// import * as express from 'express';
import * as http from 'http';
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
    // private _websocketServer: WebSocket.Server = null;
    // private _onMessageHandler: (msg: string) => void = this._onMessage.bind(this);
    // private _onCloseHandler: (playerId: string) => void = this._onClose.bind(this);
    // private _onUpdateClientsHandler: (msg: any) => void = this._onUpdateClients.bind(this);

    constructor(server: http.Server, sessionParser: any) {
        console.log('SocketController');
    }

    public init(): void {
        console.log('SocketController.init()');
    }
}
