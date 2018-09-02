import StageCellModel from './stage-cell.model';

export default class StageCellCollection {
    private _items: StageCellModel[] = [];

    get length(): number {
        return this._items.length;
    }

    public add(item: StageCellModel): void {
        this._items.push(item);
    }

    public remove(itemToRemove: StageCellModel): void {
        this._items = this._items.filter((item: StageCellModel) => itemToRemove.id !== item.id);
    }

    public findById(id: string): StageCellModel {
        return this._items.filter((item: StageCellModel) => id === item.id)[0];
    }
}
