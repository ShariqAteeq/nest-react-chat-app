"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.title = [];
    }
    handleMessage(client, payload) {
        this.server.emit('message', 'test');
    }
    async handleConnection(socket) {
        console.log('on connect');
        try {
            this.title.push('value ' + Math.random().toString());
            this.server.emit('message', this.title);
        }
        catch (error) {
            console.log(error, 'error');
            return this.disconnect(socket);
        }
    }
    handleDisconnect(socket) {
        console.log('disconnect');
        return this.disconnect(socket);
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway({
        cors: { origin: ['https://hoppscotch.io', 'http://localhost:3001'] },
    })
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map