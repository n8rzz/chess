import PlayerCollection from './player.collection';
import PlayerModel from './player.model';

class PlayerController {
    private _collection: PlayerCollection = null;

    get connectedPlayers(): string[] {
        return this._collection.playerList;
    }

    constructor() {
        this._collection = new PlayerCollection();
    }

    public createPlayer(id: string, email: string, sessionId?: string): void {
        this._createPlayer(id, email, sessionId);
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

    private _createPlayer(id: string, email: string, sessionId?: string): void {
        if (this.hasPlayer(id)) {
            return;
        }

        const player: PlayerModel = new PlayerModel(id, email, sessionId);

        this._collection.add(player);
    }
}

export default new PlayerController();
