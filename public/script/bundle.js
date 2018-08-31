(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppController = /** @class */ (function () {
    function AppController() {
    }
    AppController.prototype.log = function (msg) {
        console.log('+++', msg);
    };
    return AppController;
}());
exports.default = AppController;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_controller_1 = require("./app.controller");
(function () {
    var appController = new app_controller_1.default();
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
    connection.onopen = function () { };
    connection.onerror = function (error) {
        appController.log("" + JSON.stringify(error));
    };
    connection.onmessage = function (message) {
        appController.log("" + JSON.stringify(message));
        _updateView(message.data);
    };
})();

},{"./app.controller":1}]},{},[2])
//# sourceMappingURL=bundle.js.map
