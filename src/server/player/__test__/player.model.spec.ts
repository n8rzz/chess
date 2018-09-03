import { expect } from 'chai';
import PlayerModel from '../player.model';

describe('PlayerModel', () => {
    describe('when passed an `id`', () => {
        it('instantiates with that id', () => {
            const idMock: string = 'a1b2c3d4e5f6';
            const model: PlayerModel = new PlayerModel(idMock);

            expect(model.id).to.equal(idMock);
        });
    });

    describe('when not passed an `id`', () => {
        it('instantiates a generated', () => {
            const model: PlayerModel = new PlayerModel();

            expect(typeof model.id).to.equal('string');
        });
    });
});
