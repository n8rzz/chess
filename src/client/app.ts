import AppController from './app.controller';

(() => {
    const id = (new Date()).getTime();
    const appController: AppController = new AppController();

    const msgView = document.getElementsByClassName('js-messageView')[0];
    const sendBtn = document.getElementsByClassName('js-sendBtn')[0];

    sendBtn.addEventListener('click', onClickSend);

    function onClickSend(event: any) {
        const msg = JSON.stringify({ player: id, initialPosition: [4, 4], nextPosition: [4, 3] });

        connection.send(msg);
    }

    function _updateView(nextMsgView: any) {
        msgView.textContent = nextMsgView;
    }

    const connection = new WebSocket('ws://localhost:8876');

    connection.onopen = () => {};

    connection.onerror = (error) => {
        appController.log(`${JSON.stringify(error)}`);
    };

    connection.onmessage = (message) => {
        appController.log(`${JSON.stringify(message)}`);

        _updateView(message.data);
    };
})();
