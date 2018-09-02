import StageViewController from './stage/stage-view.controller';

class AppController {
    private _stageViewController: StageViewController = null;

    constructor() {
        const stageElement: SVGElement = document.getElementsByClassName('js-stage')[0] as SVGElement;
        this._stageViewController = new StageViewController(stageElement);
    }

    public log(msg: string): void {
        console.log('+++', msg);
    }
}

export default AppController;
