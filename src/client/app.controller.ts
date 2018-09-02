import StageViewController from './stage/stage-view.controller';

export default class AppController {
    private _stageViewController: StageViewController = null;

    constructor() {
        return this._init()
            ._createChildren();
    }


    public log(msg: string): void {
        console.log('+++', msg);
    }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        const stageElement: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;

        if (typeof stageElement === 'undefined') {
            return this;
        }

        this._stageViewController = new StageViewController(stageElement);

        return this;
    }
}

