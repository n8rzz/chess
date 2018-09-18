export default class PlayerModel {
    public readonly id: string = null;
    public readonly email: string = null;

    private _sessionId: string = null;
    private _socketId: string = null;

    get sessionId(): string {
        return this._sessionId;
    }

    set sessionId(sessionId: string) {
        this._sessionId = sessionId;
    }

    get socketId(): string {
        return this._socketId;
    }

    set socketId(socketId: string) {
        this._socketId = socketId;
    }

    constructor(id: string, email: string, sessionId: string) {
        this.id = id;
        this.email = email;
        this._sessionId = sessionId;
    }
}
