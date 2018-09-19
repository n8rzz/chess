import EventModel from './event.model';

/**
 * Creates a static class that should be used for cross class communication.
 *
 * This alleviates the need for direct imports between classes. Instead, the class
 * that performs an action need only `trigger` and any listening classes can respond
 * with their own internal callback.
 *
 * As a rule, when this class is used it should be reassigned to an instance property `#eventBus`.
 *
 * Example:
 * - triggering class `this.eventBus.trigger('EVENT_NAME', DATA_TO_PASS)`
 * - responding class `this.eventBus.on('EVENT_NAME', this.onEventCallback)`
 *
 * @class EventBus
 */
export default class EventBus {
    private _events: {[key: string]: EventModel} = {};

    public destroy(): void {
        this._events = {};
    }

    /**
     * Register an event with a callback
     *
     * If an eventName already exists, add the observer to the observers list
     */
    public on(eventName: string, callback: (...args: any[]) => any): void {
        if (this.has(eventName)) {
            this._events[eventName].addObserver(callback);

            return;
        }

        this._events[eventName] = new EventModel(eventName);

        this._addObserver(eventName, callback);
    }

    /**
     * Remove a callback from the observers list
     *
     * When multiple observers exist, remove only the one callback from that list
     *
     * When `eventName` is the only observer, the event will be destroyed
     * and removed from `#_events`
     */
    public off(eventName: string, callback: (...args: any[]) => any): void {
        if (!this.has(eventName)) {
            return;
        }

        this._removeObserver(eventName, callback);

        if (this._events[eventName].observers.length < 1) {
            this._removeEventKey(eventName);
        }
    }

    /**
     * Trigger an event
     *
     * Will result in calling all of the observers listed for a particular
     * event with the provided argument(s)
     */
    public trigger(eventName: string, ...args: any[]): void {
        if (!this.has(eventName)) {
            return;
        }

        console.log('-- EventBus.trigger() ', eventName, ...args);

        const observers = this._events[eventName].observers;

        for (let i = 0; i < observers.length; i++) {
            observers[i](...args);
        }
    }

    /**
     * Boolean helper used to determine if `eventName` exists within `#_events`
     */
    public has(eventName: string): boolean {
        return this._events.hasOwnProperty(eventName);
    }

    /**
     * Add an observer to an event's observer list
     */
    private _addObserver(eventName: string, callback: (...args: any[]) => any): void {
        this._events[eventName].addObserver(callback);
    }

    /**
     * Remove an observer from an event's observer list
     */
    private _removeObserver(eventName: string, callback: (...args: any[]) => void): void {
        this._events[eventName].removeObserver(callback);
    }

    /**
     * Remove a key from `#_events`
     *
     * This should only be called after the removal of the last observer
     * for an `eventName`
     */
    private _removeEventKey(eventName: string): void {
        delete this._events[eventName];
    }
}
