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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_1 = require("../../../entities/room");
const user_1 = require("../../../entities/user");
const models_1 = require("../../../models");
const typeorm_2 = require("typeorm");
let RoomService = class RoomService {
    constructor(roomRepo, userRepo) {
        this.roomRepo = roomRepo;
        this.userRepo = userRepo;
    }
    async createRoom(room, creator) {
        let newRoom = await this.addCreatorToRoom(room, creator);
        return this.roomRepo.save(newRoom);
    }
    async getRoomsForUsers(userId) {
        const query = await this.roomRepo
            .createQueryBuilder('room')
            .leftJoin('room.users', 'user')
            .where('user.id = :userId', { userId })
            .leftJoinAndSelect('room.users', 'all_users')
            .orderBy('room.updatedAt', 'DESC')
            .getMany();
        return query;
    }
    async addCreatorToRoom(room, creator) {
        room.users.push(creator);
        return room;
    }
};
RoomService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(room_1.RoomEntity)),
    __param(1, typeorm_1.InjectRepository(user_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map