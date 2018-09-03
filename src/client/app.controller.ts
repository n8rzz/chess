import PlayerListViewController from './playerList/player-list-view.controller';
import StageViewController from './stage/stage-view.controller';

export default class AppController {
    private _playerListController: PlayerListViewController = null;
    private _stageViewController: StageViewController = null;

    constructor() {
        return this._init()
            ._createChildren();
    }

    public log(msg: string): void {
        console.log('+++', msg);
    }

    public updateActivePlayerList(activePlayerList: string[]): void {
        const playerList: string[] = activePlayerList;

        this._playerListController.updateActivePlayerList(playerList);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        const stageElement: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;
        const playerListElement: HTMLElement = document.getElementsByClassName('js-playerListView')[0] as HTMLElement;

        if (typeof stageElement !== 'undefined') {
            this._stageViewController = new StageViewController(stageElement);
        }

        if (typeof playerListElement) {
            this._playerListController = new PlayerListViewController(playerListElement);
        }

        return this;
    }
}

