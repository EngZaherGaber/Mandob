"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebsocketService = void 0;
var core_1 = require("@angular/core");
var signalR = require("@microsoft/signalr");
var rxjs_1 = require("rxjs");
var WebsocketService = /** @class */ (function () {
    function WebsocketService() {
        this.messageSource = new rxjs_1.ReplaySubject(50);
        this.message$ = this.messageSource.asObservable(); // subscribe to this in components
    }
    WebsocketService.prototype.startConnection = function (userId) {
        var _this = this;
        if (this.hubConnection)
            return; // prevent multiple connections
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('/notificationHub')
            .withAutomaticReconnect()
            .build();
        this.hubConnection
            .start()
            .then(function () {
            console.log('✅ SignalR Connected');
            _this.sendMessageToServer('OnNotification', { type: 'login', value: { Sec: _this.hashUserId(userId) } });
        })["catch"](function (err) { return console.error('❌ SignalR Error:', err); });
        // Listen for notifications
        this.hubConnection.on('OnNotification', function (message) {
            var _a;
            var type = message.type;
            switch (type) {
                case 'register':
                    if (!((_a = message.value) === null || _a === void 0 ? void 0 : _a.success)) {
                        _this.stopConnection();
                        _this.startConnection(userId);
                    }
                    break;
                default:
                    _this.messageSource.next(message);
                    break;
            }
        });
    };
    WebsocketService.prototype.hashUserId = function (userId) {
        var plainText = userId.toString();
        return btoa(unescape(encodeURIComponent(plainText)));
    };
    WebsocketService.prototype.sendMessageToServer = function (method, payload) {
        var _a;
        (_a = this.hubConnection) === null || _a === void 0 ? void 0 : _a.invoke(method, payload)["catch"](function (err) { return console.error('Send failed', err); });
    };
    WebsocketService.prototype.stopConnection = function () {
        var _a;
        (_a = this.hubConnection) === null || _a === void 0 ? void 0 : _a.stop();
        this.hubConnection = undefined;
        console.log('🔌 SignalR Disconnected');
    };
    WebsocketService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], WebsocketService);
    return WebsocketService;
}());
exports.WebsocketService = WebsocketService;
