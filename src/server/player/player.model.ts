import * as u4 from 'uuid/v4';

export default class PlayerModel {
    public readonly id: string = null;

    constructor(id: string = null) {
        this.id = !id ? u4() : id;
    }
}
