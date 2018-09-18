import { expect } from 'chai';
import PlayerController from '../player.controller';
import PlayerModel from '../player.model';

describe('PlayerController', () => {
    beforeEach(() => {
        PlayerController.resetCollection();
    });

    describe('.createPlayer()', () => {
        describe('when player does not already exist', () => {
            it('creates a PlayerModel', () => {
                const idMock: string = 'a1b2c3d4e5';
                const emailMock: string = 'apowers@mod.gov';
                const sessionIdMock: string = 'a1b2c3d4e5';

                PlayerController.createPlayer(idMock, emailMock, sessionIdMock);

                expect(PlayerController.connectedPlayers[0]).to.equal(idMock);
            });
        });

        describe('when player already exists', () => {
            it('does not create a PlayerModel', () => {
                const idMock: string = 'a1b2c3d4e5';
                const emailMock: string = 'apowers@mod.gov';
                const sessionIdMock: string = 'a1b2c3d4e5';

                PlayerController.createPlayer(idMock, emailMock, sessionIdMock);
                PlayerController.createPlayer(idMock, emailMock, sessionIdMock);

                expect(PlayerController.connectedPlayers[0]).to.equal(idMock);
                expect(PlayerController.connectedPlayers[1]).to.equal(undefined);
            });
        });
    });
});
