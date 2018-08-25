(function() {
    var connection = new WebSocket('ws://localhost:8876');
    var sendBtn = document.getElementsByClassName('js-sendBtn')[0];

    sendBtn.addEventListener('click', onClickSend);

    connection.onopen = function _onOpen() {
        console.log('onopen');
        // connection is opened and ready to use
    };

    connection.onerror = function _onError(error) {
        console.log('err', error);
    };

    connection.onmessage = function _onMessage(message) {
        // try {
        //     var json = JSON.parse(message.data);
        // } catch (error) {
        //     throw error;
        // }

        console.log('+++ MESSAGE:', message);
    };

    function onClickSend(event) {
        connection.send('USER CLICK');
    }
})();

