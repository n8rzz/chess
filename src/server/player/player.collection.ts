import PlayerModel from './player.model';

export default class PlayerCollection {
    private _items: PlayerModel[] = [];

    // FIXME: return models, no abstractions needed
    get playerList(): any[] {
        return this._items.map((item: PlayerModel): any => ({
            email: item.email,
            playerId: item.id,
        }));
    }

    get length(): number {
        return this._items.length;
    }

    public add(item: PlayerModel): void {
        this._items.push(item);
    }

    public remove(playerToRemove: PlayerModel): void {
        this._removePlayer(playerToRemove);
    }

    public removePlayerById(playerId: string): void {
        const playerToRemove: PlayerModel = this.findPlayerById(playerId);

        if (typeof playerToRemove === 'undefined') {
            console.error(`Attempted to remove a playerId that does not exist: ${playerId}`);
        }

        this._removePlayer(playerToRemove);
    }

    public reset(): void {
        this._items = [];
    }

    public findPlayerById(id: string): PlayerModel {
        return this._items.filter((item: PlayerModel): boolean => id === item.id)[0];
    }

    private _removePlayer(playerToRemove: PlayerModel): void {
        this._items = this._items.filter((item: PlayerModel): boolean => playerToRemove.id !== item.id);
    }
}
