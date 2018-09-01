import { expect } from 'chai';
import AppController from '../app.controller';

describe('AppController', () => {
    it('should not throw', () => expect(() => new AppController()).to.not.throw());
});
