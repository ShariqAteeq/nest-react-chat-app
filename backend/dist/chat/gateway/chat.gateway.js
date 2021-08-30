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
const auth_service_1 = require("../../auth/services/auth.service");
const user_service_1 = require("../../user/user.service");
const room_service_1 = require("../services/room/room.service");
let ChatGateway = class ChatGateway {
    constructor(authService, userService, roomService) {
        this.authService = authService;
        this.userService = userService;
        this.roomService = roomService;
    }
    handleMessage(client, payload) {
        this.server.emit('message', 'test');
    }
    async handleConnection(socket) {
        var _a, _b, _c;
        console.log('on connect');
        try {
            const decodedToken = await this.authService.verifyJwt((_b = (_a = socket === null || socket === void 0 ? void 0 : socket.handshake) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.token);
            const user = await this.userService.findOne((_c = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.user) === null || _c === void 0 ? void 0 : _c.id);
            if (!user) {
                return this.disconnect(socket);
            }
            else {
                socket.data.user = user;
                const rooms = await this.roomService.getRoomsForUsers(user.id);
                return this.server.to(socket.id).emit('rooms', rooms);
            }
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
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        room_service_1.RoomService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map