import StageCellCollection from './stage-cell.collection';
import StageCellModel from './stage-cell.model';

const HEIGHT: number = 8;
const WIDTH: number = 8;

export default class StageViewController {
    private _element: SVGElement = null;
    private _collection: StageCellCollection = null;

    constructor(element: SVGElement) {
        if (typeof element === 'undefined') {
            return;
        }

        this._element = element;
        this._collection = new StageCellCollection();

        return this._init()
            ._createChildren();
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const stageCellModel: StageCellModel = new StageCellModel(y, x);

                this._element.appendChild(stageCellModel.element);
                this._collection.add(stageCellModel);
            }
        }

        return this;
    }
}
