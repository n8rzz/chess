import { expect } from 'chai';
import StageCellCollection from '../stage-cell.collection';

describe('StageCellCollection', () => {
    it('should not throw', () => expect(() => new StageCellCollection()).to.not.throw());
});
