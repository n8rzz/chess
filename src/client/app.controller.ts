import SocketService from './socket.service';
import PlayerListViewController from './playerList/player-list-view.controller';
import StageViewController from './stage/stage-view.controller';

export default class AppController {
    public socketService: SocketService = null;

    protected onUpdatePlayerListHandler: (playerList: string[]) => void = this.updateActivePlayerList.bind(this);
    protected onUpdateViewHandler: (msg: string) => void = this.updateView.bind(this);

    private _msgViewElement: HTMLElement = null;
    private _playerListController: PlayerListViewController = null;
    private _playerIdElement: HTMLElement = null;
    private _stageViewController: StageViewController = null;
    private _sendBtnElement: HTMLButtonElement = null;
    private _onClickSendHandler: (event: UIEvent) => void = this._onClickSend.bind(this);

    get playerId(): string {
        if (this._playerIdElement === null) {
            return '';
        }

        return this._playerIdElement.dataset.playerId;
    }

    constructor() {
        this.socketService = new SocketService(this.onUpdateViewHandler, this.onUpdatePlayerListHandler);

        return this._init()
            ._createChildren()
            ._enable();
    }

    public log(msg: string): void {
        console.log('+++', msg);
    }

    public updateActivePlayerList(activePlayerList: string[]): void {
        const playerList: string[] = activePlayerList;

        this._playerListController.updateActivePlayerList(playerList);
    }

    public updateView(nextMsgView: any) {
        if (!this._msgViewElement) {
            return;
        }

        this._msgViewElement.textContent = nextMsgView;
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        const playerIdElement: HTMLElement = document.getElementsByClassName('js-playerId')[0] as HTMLElement;
        const playerListElement: HTMLElement = document.getElementsByClassName('js-playerListView')[0] as HTMLElement;
        const stageElement: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;
        const msgViewElement: HTMLElement = document.getElementsByClassName('js-messageView')[0] as HTMLElement;
        const sendBtnElement: HTMLButtonElement = document.getElementsByClassName('js-sendBtn')[0] as HTMLButtonElement;

        if (typeof playerIdElement !== 'undefined') {
            this._playerIdElement = playerIdElement;
        }

        if (typeof sendBtnElement !== 'undefined') {
            this._sendBtnElement = sendBtnElement;
        }

        if (typeof msgViewElement !== 'undefined') {
            this._msgViewElement = msgViewElement;
        }

        this._playerListController = new PlayerListViewController(playerListElement);
        this._stageViewController = new StageViewController(stageElement);

        return this;
    }

    private _enable(): this {
        if (!this._sendBtnElement) {
            return this;
        }

        this.socketService.setupConnection(this.playerId);
        this._sendBtnElement.addEventListener('click', this._onClickSendHandler);

        return this;
    }

    private _onClickSend(event: UIEvent): void {
        const msg = JSON.stringify({ player: this.playerId, gameId: 1, initialPosition: [4, 4], nextPosition: [4, 3] });

        this.socketService.send(msg);
    }
}
