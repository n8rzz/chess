export interface IConnectedPlayers {
    connectedPlayers: string[];
}

export default class PlayerListViewController {
    private _element: HTMLElement = null;
    private _playerListElement: HTMLUListElement = null;
    private _activePlayerList: string[] = [];

    constructor(element: HTMLElement) {
        if (!element) {
            return;
        }

        this._element = element;
        const initialActivePlayers: IConnectedPlayers = JSON.parse(this._element.dataset.connectedPlayers) as IConnectedPlayers;
        this._activePlayerList = initialActivePlayers.connectedPlayers;

        return this._init()
            ._createChildren();
    }

    public updateActivePlayerList(activePlayerList: string[]): void {
        this._activePlayerList = activePlayerList;

        this._destroyPlayerListElement();
        this._createChildren();
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._createPlayerListElement();
        this._createPlayerListItemsElements();

        this._element.appendChild(this._playerListElement);

        return this;
    }

    private _createPlayerListElement(): void {
        this._playerListElement = document.createElement('ul');
    }

    private _createPlayerListItemsElements(): void {
        if (this._activePlayerList.length === 0) {
            return;
        }

        for (let i = 0; i < this._activePlayerList.length; i++) {
            const player: string = this._activePlayerList[i];
            const listItemElement: HTMLLIElement = document.createElement('li');
            listItemElement.textContent = player;

            this._playerListElement.appendChild(listItemElement);
        }
    }

    private _destroyPlayerListElement(): void {
        this._element.removeChild(this._playerListElement);
    }
}
