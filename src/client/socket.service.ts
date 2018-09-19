import EventBus from '../shared/event-bus/event-bus';

const SOCKET_PORT: number = 8876;
const SOCKET_URI: string = `ws://localhost:${SOCKET_PORT}`;

export enum ActionType {
    NewConnection = 'NEW_CONNECTION',
    ClosedConnection = 'CLOSED_CONNECTION',
    PlayerIdConfirmation = 'PLAYER_ID_CONFIRMATION',
}

export interface IAction {
    type: string;
    payload?: any;
}

export default class SocketService {
    private _connection: WebSocket = null;
    private _eventBus: EventBus = null;
    private _isEnabled: boolean = false;
    private _playerId: string = null;
    private _onUpdateActivePlayerList: (playerList: string[]) => void = null;
    private _onUpdateView: (msg: string) => void = null;

    constructor(
        eventBus: EventBus,
        onUpdateView: (msg: string) => void,
        onUpdateActivePlayerList: (playerList: string[]) => void,
    ) {
        this._eventBus = eventBus;
        this._onUpdateActivePlayerList = onUpdateActivePlayerList;
        this._onUpdateView = onUpdateView;

        return this._init()
            ._setupHandlers()
            .enable();
    }

    public disable(): this {
        if (!this._isEnabled) {
            return this;
        }

        this._isEnabled = false;

        return this;
    }

    public enable(): this {
        if (this._isEnabled) {
            return this;
        }

        this._isEnabled = true;

        return this;
    }

    public send(msg: any): void {
        if (!this._isEnabled) {
            return;
        }

        this._connection.send(msg);
    }

    public setupConnection(playerId: string): void {
        if (!this._isEnabled) {
            return;
        }

        console.log('### - setupConnection', playerId);

        this._playerId = playerId;
        this._connection = new WebSocket(SOCKET_URI);
        this._connection.onopen = (msg: any): void => this._onOpen(msg);
        this._connection.onerror = (msg: any): void => this._onError(msg);
        this._connection.onmessage = (msg: any): void => this._onMessage(msg);
        this._connection.onclose = (msg: any): void => this._onClose(msg);

    }

    private _onOpen(msg: string): void {
        this._eventBus.trigger('ConnectionOpen');
        console.log('@@@ - onOpen', msg);

        this.send(JSON.stringify({
            type: ActionType.PlayerIdConfirmation,
            payload: this._playerId,
        }));
    }

    private _onError(msg: string): void {
        this._eventBus.trigger('Error', `${JSON.stringify(msg)}`);
        console.log('@@@ - onError', `${JSON.stringify(msg)}`);
    }

    private _onMessage(msg: MessageEvent): void {
        this._eventBus.trigger('Message', `${JSON.stringify(msg)}`);
        console.log('@@@ - onMessage', `${JSON.stringify(msg)}`);

        const messageToSend = {
            ...msg,
            // playerId: appController.playerId,
        };
        // TODO: throwaway
        // appController.log(`${JSON.stringify(messageToSend)}`);
        this._onUpdateView(msg.data);
        // throwaway end

        try {
            const msgData: IAction = JSON.parse(msg.data);

            switch (msgData.type) {
                case ActionType.NewConnection:
                    this._onUpdateActivePlayerList(msgData.payload);
                    this._eventBus.trigger('UpdatePlayerList', msgData.payload);

                    break;
                case ActionType.ClosedConnection:
                    this._onUpdateActivePlayerList(msgData.payload);
                    this._eventBus.trigger('UpdatePlayerList', msgData.payload);

                    break;
                default:
                    throw new Error(`Unknown message type: ${msgData.type}`);
            }
        } catch (error) {}
    }

    private _onClose(msg: string): void {
        console.log('@@@ - onClose', msg);
    }

    private _init(): this {
        return this;
    }

    private _setupHandlers(): this {
        return this;
    }
}
