import * as WebSocket from 'ws';
import * as http from 'http';

export class SocketController {
    public socket: WebSocket.Server = null;

    constructor(server: http.Server) {
        this.socket = new WebSocket.Server({ server });
    }
}
