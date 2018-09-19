// tslint:disable no-string-literal
import {expect} from 'chai';
import EventBus from '../event-bus';

const eventNameMock: string = 'click';
const callbackMock: (v: number) => number = function doSomething(v: number): number {
    return v + 1;
};
const anonymousCallbackMock: (v: number) => number = function(v: number): number {
    return v + 1;
};

describe('EventBus', () => {
    let eventBus: EventBus = null;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    afterEach(() => {
        eventBus.destroy();
    });

    describe('.on()', () => {
        it('adds an eventName with a callback to #_events', () => {
            eventBus.on(eventNameMock, callbackMock);

            expect(typeof eventBus['_events'][eventNameMock] !== 'undefined');
        });

        it('adds an additional callback to #_events when an eventName already exists', () => {
            eventBus.on(eventNameMock, callbackMock);
            eventBus.on(eventNameMock, anonymousCallbackMock);

            expect(eventBus['_events'][eventNameMock].observers.length === 2);
        });
    });

    describe('.off()', () => {
        it('removes an observer from an eventName', () => {
            eventBus.on(eventNameMock, callbackMock);
            eventBus.on(eventNameMock, anonymousCallbackMock);
            eventBus.off(eventNameMock, callbackMock);

            expect(eventBus['_events'].click.observers.length).to.equal(1);
        });

        describe('when passed an eventName that doesnt exist in the list', () => {
            it('returns early', () => {
                eventBus.on(eventNameMock, callbackMock);
                eventBus.on(eventNameMock, anonymousCallbackMock);
                eventBus.off('threeve', callbackMock);

                expect(eventBus['_events'].click.observers.length).to.equal(2);
            });
        });

        describe('when no other observers exist', () => {
            it('remove the event from #_events', () => {
                eventBus.on(eventNameMock, callbackMock);
                eventBus.off(eventNameMock, callbackMock);

                expect(typeof eventBus['_events'].click).to.equal('undefined');
            });
        });
    });

    describe('.trigger()', () => {
        it('calls each observer with #args', () => {
            let val: number = 0;
            const triggerFnMock = (plus: number, minus: number = 0) => {
                val += plus;
                val -= minus;
            };
            eventBus.on(eventNameMock, triggerFnMock);
            eventBus.trigger(eventNameMock, 11, 3);

            expect(val).to.equal(8);
        });

        describe('when an event does not exist', () => {
            it('does not throw', () => {
                expect(() => eventBus.trigger(eventNameMock, 11, 3)).to.not.throw;
            });
        });
    });
});
