import { expect } from 'chai';
import PlayerController from '../player.controller';
import PlayerModel from '../player.model';

describe('PlayerController', () => {
    beforeEach(() => {
        PlayerController.resetCollection();
    });

    describe('.createPlayer()', () => {
        it('creates a PlayerModel', () => {
            const model: PlayerModel = PlayerController.createPlayer();

            expect(model).to.not.be.null;
        });
    });

    describe('.createPlayerWithId()', () => {
        it('creates a PlayerModel with a provided ID', () => {
            const idMock: string = 'a1b2c3d4e5';

            PlayerController.createPlayerWithId(idMock);

            expect(PlayerController.connectedPlayers[0]).to.equal(idMock);
        });
    });
});
