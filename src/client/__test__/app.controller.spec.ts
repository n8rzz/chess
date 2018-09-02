import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import AppController from '../app.controller';

describe('AppController', () => {
    describe('when `js-stage` is present in the DOM', () => {
        beforeEach(() => {
            const { window } = new JSDOM('<!doctype html><html><body><svg class="stage js-stage" viewBox="0 0 800 800"></svg></body></html>');
            (global as any).document = window.document;
            (global as any).window = window;
        });

        afterEach(() => {
            (global as any).document = {};
            (global as any).window = {};
        });

        it('should not throw', () => {
            expect(() => new AppController()).to.not.throw();
        });
    });

    describe('when `js-stage` is not present in the DOM', () => {
        beforeEach(() => {
            const { window } = new JSDOM('<!doctype html><html><body></body></html>');
            (global as any).document = window.document;
            (global as any).window = window;
        });

        afterEach(() => {
            (global as any).document = {};
            (global as any).window = {};
        });

        it('should not throw', () => {
            expect(() => new AppController()).to.not.throw();
        });
    });
});
