import {expect} from 'chai';
import EventModel from '../event.model';

const eventNameMock: string = 'click';
const observerMock: () => boolean = function doSomething() {
    return true;
};
const anonymousObserverMock: () => boolean = function() {
    return true;
};

describe('EventModel', () => {
    describe('when called to instantiate', () => {
        it('does not thow', () => {
            expect(() => new EventModel('')).to.not.throw;
        });
    });

    describe('.addObserver()', () => {
        describe('when an observer does not exist in #observers', () => {
            it('adds an observer', () => {
                const model = new EventModel(eventNameMock);

                model.addObserver(observerMock);

                expect(model.observers.length).to.equal(1);
            });
        });

        describe('when an observer exists in #observers', () => {
            it('returns early', () => {
                const model = new EventModel(eventNameMock);
                model.observers.push(observerMock);

                model.addObserver(observerMock);

                expect(model.observers.length).to.equal(1);
            });
        });
    });

    describe('.removeObserver()', () => {
        describe('when an observer exists in #observers', () => {
            it('removes oberserver from #observers', () => {
                const model = new EventModel(eventNameMock);
                model.observers.push(observerMock);
                model.observers.push(anonymousObserverMock);

                model.removeObserver(observerMock);

                expect(model.observers.length).to.equal(1);
            });
        });

        describe('when an observer does not exist in #observers', () => {
            it('returns early', () => {
                const model = new EventModel(eventNameMock);
                model.observers.push(anonymousObserverMock);

                model.removeObserver(observerMock);

                expect(model.observers.length).to.equal(1);
            });
        });
    });

    describe('.destroy()', () => {
        it('resets #name and #observers', () => {
            const model = new EventModel(eventNameMock);
            model.observers.push(observerMock);
            model.observers.push(anonymousObserverMock);

            model.destroy();

            expect(model.name).to.equal('');
            expect(model.observers.length).to.equal(0);
        });
    });
});
