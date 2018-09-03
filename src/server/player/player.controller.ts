import PlayerCollection from './player.collection';
import PlayerModel from './player.model';

class PlayerController {
    private _collection: PlayerCollection = null;

    get connectedPlayers(): string[] {
        return this._collection.playerIdList;
    }

    constructor() {
        this._collection = new PlayerCollection();
    }

    public createPlayer(): PlayerModel {
        return this._createPlayer();
    }

    public createPlayerWithId(id: string): void {
        this._createPlayer(id);
    }

    public hasPlayer(id: string): PlayerModel {
        return this._collection.findPlayerById(id);
    }

    public removePlayer(id: string): void {
        this._collection.removePlayerById(id);
    }

    public resetCollection(): void {
        this._collection.reset();
    }

    private _createPlayer(id?: string): PlayerModel {
        const player: PlayerModel = new PlayerModel(id);

        this._collection.add(player);

        return player;
    }
}

export default new PlayerController();
