import { expect } from 'chai';
import PlayerModel from '../player.model';

describe('PlayerModel', () => {
    describe('when passed without required params', () => {
        it('does not throw', () => {
            expect(() => new PlayerModel(null, null, null)).to.not.throw();
        });
    });
});
