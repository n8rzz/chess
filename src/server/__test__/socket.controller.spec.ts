import * as express from 'express';
import * as http from 'http';
import { expect } from 'chai';
import SocketController from '../socket.controller';

const serverStub = http.createServer(express());

describe('SocketController', () => {
    it('should not throw', () => expect(() => new SocketController(serverStub)).to.not.throw());
});
