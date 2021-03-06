// import {
//     PLAYER,
//     PLAYER_PIECE_CLASSNAME,
// } from '../constants/playerConstants';

export const STAGE = {
    CELL_HEIGHT: 100,
    CELL_WIDTH: 100,
    ROW_CELL_COUNT: 8,
    COLUMN_CELL_COUNT: 8,
};
const CELL_CLASSNAME = 'stageCell';
const LIGHT_CLASSNAME = 'mix-stageCell_light';
const DARK_CLASSNAME = 'mix-stageCell_dark';
// const AVAILABLE_MOVE_CLASSNAME = 'mix-stageCell_availableMove';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export default class StageCellModel {
    private static _count = 0;

    public element: SVGElement = null;
    public gameCellElement: SVGRectElement = null;
    public gamePieceElement: SVGCircleElement = null;
    // public availableMoveIndicatorElement: SVGCircleElement = null;
    public id: string = '';
    // public isActive: boolean = false;
    // public isAvailableMove: boolean = false;
    // public gamePieceElementRadius: number = -1;
    // public availableMoveIndicatorElementRadius: number = 15;
    public height: number = -1;
    public width: number = -1;
    public x: number = -1;
    public y: number = -1;

    private _modelId: number = StageCellModel._count++;
    private _backgroundClassname: string = '';
    // private _playerId: PLAYER = PLAYER.INVALID_PLAYER;
    // private _onClickStageCellHandler: (event: UIEvent) => void;

    constructor(
        y: number,
        x: number,
        // player: PLAYER,
        // onClickHandler: (event: UIEvent) => void,
    ) {
        // this.gamePieceElementRadius = (STAGE.CELL_WIDTH - 10) * 0.5;
        this.height = STAGE.CELL_HEIGHT;
        this.width = STAGE.CELL_WIDTH;
        this.x = x;
        this.y = y;
        // must come after `x` and `y`
        this.id = this._buildCellId();
        this._backgroundClassname = this._buildBackgroundClassname();
        // this._playerId = player;
        // this._onClickStageCellHandler = onClickHandler;

        this._init()
            ._createChildren()
            ._enable();
    }

    // public addGamePiece(currentPlayer: number): void {
    //     this.isActive = true;
    //     const playerClassname: string = PLAYER_PIECE_CLASSNAME[currentPlayer];

    //     this.gamePieceElement.classList.add(playerClassname);
    //     this.element.appendChild(this.gamePieceElement);
    // }

    // public removeGamePiece(): void {
    //     this.isActive = false;
    //     this._playerId = PLAYER.INVALID_PLAYER;
    //     const playerClassname: string = PLAYER_PIECE_CLASSNAME[this._playerId];

    //     this.gamePieceElement.classList.remove(playerClassname);
    //     this.element.removeChild(this.gamePieceElement);
    // }

    // public addAvailableMoveIndicator(): void {
    //     this.isAvailableMove = true;
    //     this.element.appendChild(this.availableMoveIndicatorElement);
    // }

    // public removeAvailableMoveIndicator(): void {
    //     if (!this.isAvailableMove) {
    //         return;
    //     }

    //     this.isAvailableMove = false;
    //     this.element.removeChild(this.availableMoveIndicatorElement);
    // }

    // public togglePlayer(currentPlayer: number): void {
    //     if (this._hasClass(PLAYER_PIECE_CLASSNAME[0])) {
    //         this.gamePieceElement.classList.remove(PLAYER_PIECE_CLASSNAME[0]);
    //         this.gamePieceElement.classList.add(PLAYER_PIECE_CLASSNAME[1]);

    //         return;
    //     }

    //     this.gamePieceElement.classList.remove(PLAYER_PIECE_CLASSNAME[1]);
    //     this.gamePieceElement.classList.add(PLAYER_PIECE_CLASSNAME[0]);
    // }

    // public updateOwner(player: PLAYER): void {
    //     if (this._hasClass(PLAYER_PIECE_CLASSNAME[player])) {
    //         return;
    //     }

    //     this.togglePlayer(player);
    // }

    private _init(): this {
        return this;
    }

    private _createChildren(): this {
        this._buildCellElement();
        // this._buildGamePieceElement();
        // this._buildAvailableMoveElement();
        this._buildCellGroupElement();

        // if (this._playerId !== PLAYER.INVALID_PLAYER) {
        //     this.addGamePiece(this._playerId);
        // }

        return this;
    }

    private _enable(): this {
        // this.element.addEventListener('click', this._onClickStageCellHandler);

        return this;
    }

    private _disable(): this {
        // this.element.removeEventListener('click', this._onClickStageCellHandler);

        return this._destroy();
    }

    private _destroy(): this {
        this.x = -1;
        this.y = -1;
        // this._playerId = PLAYER.INVALID_PLAYER;

        return this;
    }

    private _buildBackgroundClassname(): string {
        if (this.y % 2 === 0) {
            if (this.x % 2 === 0) {
                return LIGHT_CLASSNAME;
            }

            return DARK_CLASSNAME;
        }

        if (this.x % 2 === 0) {
            return DARK_CLASSNAME;
        }

        return LIGHT_CLASSNAME;
    }

    private _buildCellGroupElement(): void {
        this.element = document.createElementNS(SVG_NAMESPACE, 'g');
        this.element.setAttribute('id', this.id);

        this.element.appendChild(this.gameCellElement);
    }

    private _buildCellElement(): void {
        this.gameCellElement = document.createElementNS(SVG_NAMESPACE, 'rect');
        this.gameCellElement.setAttributeNS(null, 'x', `${this._calculateXPosition()}`);
        this.gameCellElement.setAttributeNS(null, 'y', `${this._calculateYPosition()}`);
        this.gameCellElement.setAttributeNS(null, 'height', `${this.height}`);
        this.gameCellElement.setAttributeNS(null, 'width', `${this.width}`);
        this.gameCellElement.classList.add(CELL_CLASSNAME);
        this.gameCellElement.classList.add(this._backgroundClassname);
    }

    private _buildCellId(): string {
        return `${this.y}-${this.x}`;
    }

    // private _buildGamePieceElement(): void {
    //     this.gamePieceElement = document.createElementNS(SVG_NAMESPACE, 'circle');
    //     this.gamePieceElement.setAttributeNS(null, 'cx', `${this._calculateXPositionForPlayerPiece()}`);
    //     this.gamePieceElement.setAttributeNS(null, 'cy', `${this._calculateYPositionForPlayerPiece()}`);
    //     this.gamePieceElement.setAttributeNS(null, 'r', `${this.gamePieceElementRadius}`);
    //     this.gamePieceElement.classList.add('playerPiece');
    // }

    // private _buildAvailableMoveElement(): void {
    //     this.availableMoveIndicatorElement = document.createElementNS(SVG_NAMESPACE, 'circle');
    //     this.availableMoveIndicatorElement.setAttributeNS(null, 'cx', `${this._calculateXPositionForPlayerPiece()}`);
    //     this.availableMoveIndicatorElement.setAttributeNS(null, 'cy', `${this._calculateYPositionForPlayerPiece()}`);
    //     this.availableMoveIndicatorElement.setAttributeNS(null, 'r', `${this.availableMoveIndicatorElementRadius}`);
    //     this.availableMoveIndicatorElement.classList.add(AVAILABLE_MOVE_CLASSNAME);
    // }

    private _calculateXPosition(): number {
        return this.x * this.width;
    }

    private _calculateYPosition(): number {
        return this.y * this.height;
    }

    private _calculateXPositionForPlayerPiece(): number {
        return (this.x * this.width) + (this.width * 0.5);
    }

    private _calculateYPositionForPlayerPiece(): number {
        return (this.y * this.height) + (this.height * 0.5);
    }

    private _hasClass(classname: string): boolean {
        return this.gamePieceElement.classList.contains(classname);
    }
}
