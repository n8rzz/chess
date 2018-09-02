import StageCellModel from './stage-cell.model';

const HEIGHT: number = 8;
const WIDTH: number = 8;

export default class StageViewController {
    private _element: SVGElement = null;
    private _items: StageCellModel[] = [];

    constructor(element: SVGElement) {
        this._element = element;

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
                this._items.push(stageCellModel);
            }
        }

        console.log('+++', this);

        return this;
    }
}
