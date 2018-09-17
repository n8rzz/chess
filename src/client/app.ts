import AppController from './app.controller';

export enum ActionType {
    NewConnection = 'NEW_CONNECTION',
    ClosedConnection = 'CLOSED_CONNECTION',
}

export interface IAction {
    type: string;
    payload?: any;
}

(() => {
    const id = (new Date()).getTime();
    const appController: AppController = new AppController();

    const playerIdElement: HTMLElement = document.getElementsByClassName('js-playerId')[0] as HTMLElement;
    const playerId: string = playerIdElement.dataset.playerId;
    const msgView: HTMLElement = document.getElementsByClassName('js-messageView')[0] as HTMLElement;
    const sendBtn: HTMLElement = document.getElementsByClassName('js-sendBtn')[0] as HTMLElement;

    sendBtn.addEventListener('click', onClickSend);

    function onClickSend(event: any) {
        const msg = JSON.stringify({ player: playerId, initialPosition: [4, 4], nextPosition: [4, 3] });

        connection.send(msg);
    }

    function _updateView(nextMsgView: any) {
        msgView.textContent = nextMsgView;
    }

    const connection = new WebSocket('ws://localhost:8876');

    connection.onopen = () => {
        console.log('+++', playerId);
    };

    connection.onerror = (error) => {
        appController.log(`${JSON.stringify(error)}`);
    };

    connection.onmessage = (message) => {
        // TODO: throwaway
        appController.log(`${JSON.stringify(message)}`);

        _updateView(message.data);
        // throwaway end

        try {
            const msgData: IAction = JSON.parse(message.data);

            switch (msgData.type) {
                case ActionType.NewConnection:
                    appController.updateActivePlayerList(msgData.payload);

                    break;
                case ActionType.ClosedConnection:
                    appController.updateActivePlayerList(msgData.payload);

                    break;
                default:
                    throw new Error(`Unknown message type: ${msgData.type}`);
            }
        } catch (error) {}
    };

    connection.onclose = (close) => {
        console.log('!!! connection closed', close);
    };
})();
