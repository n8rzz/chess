/**
 * Defines an event and an event's observers
 *
 * Should be used by the `EventBus` when defining new events
 *
 * @class EventModel
 */
export default class EventModel {
    /**
     * The name of an event
     *
     * @property name
     * @type {string}
     * @default ''
     */
    public name: string = null;

    /**
     * Functions that will be called when this event is triggered
     *
     * @property observers
     * @type {*[]}
     * @default []
     */
    public observers: Array<(...args: any[]) => any> = [];

    constructor(name: string) {
        this.init(name);
    }

    public init(name: string): void {
        this.name = name;
    }

    public destroy(): void {
        this.name = '';
        this.observers = [];
    }

    /**
     * add a callback(s) that fires when an event is triggered
     */
    public addObserver(observer: (...args: any[]) => any): void {
        if (this.hasObserver(observer)) {
            return;
        }

        this.observers.push(observer);
    }

    /**
     * remove an observer from the observers list
     */
    public removeObserver(observer: (...args: any[]) => any): void {
        if (!this.hasObserver(observer)) {
            return;
        }

        const index = this.observers.indexOf(observer);

        this.observers.splice(index, 1);
    }

    /**
     * Determine if a passed observer exists within the current observer list
     */
    public hasObserver(observer: (...args: any[]) => any): boolean {
        return this.observers.indexOf(observer) !== -1;
    }
}
