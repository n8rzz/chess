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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmdlc2xpbi9Eb2N1bWVudHMvd3d3L2NoZXNzL3NyYy9jbGllbnQvc3JjL2NsaWVudC9hcHAuY29udHJvbGxlci50cyIsIi9Vc2Vycy9uZ2VzbGluL0RvY3VtZW50cy93d3cvY2hlc3Mvc3JjL2NsaWVudC9zcmMvY2xpZW50L2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7SUFBQTtJQUlBLENBQUM7SUFIVSwyQkFBRyxHQUFWLFVBQVcsR0FBVztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUVELGtCQUFlLGFBQWEsQ0FBQzs7Ozs7QUNON0IsbURBQTZDO0FBRTdDLENBQUM7SUFDRyxJQUFNLGFBQWEsR0FBa0IsSUFBSSx3QkFBYSxFQUFFLENBQUM7SUFFekQsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFL0MscUJBQXFCLEtBQVU7UUFDM0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFekYsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQscUJBQXFCLFdBQWdCO1FBQ2pDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFNLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRXhELFVBQVUsQ0FBQyxNQUFNLEdBQUcsY0FBTyxDQUFDLENBQUM7SUFFN0IsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQUs7UUFDdkIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUM7SUFFRixVQUFVLENBQUMsU0FBUyxHQUFHLFVBQUMsT0FBTztRQUMzQixhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDO1FBRWhELFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIEFwcENvbnRyb2xsZXIge1xuICAgIHB1YmxpYyBsb2cobXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJysrKycsIG1zZyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBDb250cm9sbGVyO1xuIiwiaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSAnLi9hcHAuY29udHJvbGxlcic7XG5cbigoKSA9PiB7XG4gICAgY29uc3QgYXBwQ29udHJvbGxlcjogQXBwQ29udHJvbGxlciA9IG5ldyBBcHBDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBtc2dWaWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtbWVzc2FnZVZpZXcnKVswXTtcbiAgICBjb25zdCBzZW5kQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtc2VuZEJ0bicpWzBdO1xuXG4gICAgc2VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tTZW5kKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tTZW5kKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgbXNnID0gSlNPTi5zdHJpbmdpZnkoeyBwbGF5ZXI6IDEsIGluaXRpYWxQb3NpdGlvbjogWzQsIDRdLCBuZXh0UG9zaXRpb246IFs0LCAzXSB9KTtcblxuICAgICAgICBjb25uZWN0aW9uLnNlbmQobXNnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdXBkYXRlVmlldyhuZXh0TXNnVmlldzogYW55KSB7XG4gICAgICAgIG1zZ1ZpZXcudGV4dENvbnRlbnQgPSBuZXh0TXNnVmlldztcbiAgICB9XG5cbiAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9sb2NhbGhvc3Q6ODg3NicpO1xuXG4gICAgY29ubmVjdGlvbi5vbm9wZW4gPSAoKSA9PiB7fTtcblxuICAgIGNvbm5lY3Rpb24ub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICBhcHBDb250cm9sbGVyLmxvZyhgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XG4gICAgfTtcblxuICAgIGNvbm5lY3Rpb24ub25tZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgYXBwQ29udHJvbGxlci5sb2coYCR7SlNPTi5zdHJpbmdpZnkobWVzc2FnZSl9YCk7XG5cbiAgICAgICAgX3VwZGF0ZVZpZXcobWVzc2FnZS5kYXRhKTtcbiAgICB9O1xufSkoKTtcbiJdfQ==
