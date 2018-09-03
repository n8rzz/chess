import { expect } from 'chai';
import PlayerModel from '../player.model';
import PlayerCollection from '../player.collection';

describe('PlayerCollection', () => {
    describe('.removePlayerById()', () => {
        it('throws when passed an invalid playerId', () => {
            const playerIdMock: string = 'a1b2c3d4e5';
            const collection: PlayerCollection = new PlayerCollection();

            expect(() => collection.removePlayerById(playerIdMock)).to.not.throw();
        });

        it('does not throw when passed a valid playerId', () => {
            const playerModel: PlayerModel = new PlayerModel();
            const collection: PlayerCollection = new PlayerCollection();
            collection.add(playerModel);

            expect(() => collection.removePlayerById(playerModel.id)).to.not.throw();
        });
    });
});
