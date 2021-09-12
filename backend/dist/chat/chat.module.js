"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const connectedUsers_1 = require("../entities/connectedUsers");
const room_1 = require("../entities/room");
const user_1 = require("../entities/user");
const user_module_1 = require("../user/user.module");
const chat_gateway_1 = require("./gateway/chat.gateway");
const connectedUser_service_1 = require("./services/connectedUser/connectedUser.service");
const room_service_1 = require("./services/room/room.service");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([room_1.RoomEntity, user_1.UserEntity, connectedUsers_1.ConnectedUserEntity]),
        ],
        providers: [chat_gateway_1.ChatGateway, room_service_1.RoomService, connectedUser_service_1.ConnectedUserService],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map