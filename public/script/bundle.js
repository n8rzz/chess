(function() {
    var msgView = document.getElementsByClassName('js-messageView')[0];
    var sendBtn = document.getElementsByClassName('js-sendBtn')[0];

    sendBtn.addEventListener('click', onClickSend);

    function onClickSend(event) {
        var msg = JSON.stringify({ player: 1, initialPosition: [4, 4], nextPosition: [4, 3] });

        connection.send(msg);
    }

    function _updateView(nextMsgView) {
        msgView.textContent = nextMsgView;
    }


    var connection = new WebSocket('ws://localhost:8876');

    connection.onopen = function _onOpen() {};

    connection.onerror = function _onError(error) {
        console.log('err', error);
    };

    connection.onmessage = function _onMessage(message) {
        console.log('+++', message);

        _updateView(message.data);
    };
})();

