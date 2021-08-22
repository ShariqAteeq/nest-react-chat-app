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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("../entities/user");
const models_1 = require("../models");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(input) {
        const { email, password, username } = input;
        const existingUser = await this.userRepo.findOne({ email });
        if (existingUser) {
            throw new common_1.HttpException('User with this email already exist!', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = new user_1.UserEntity();
        user.password = await bcrypt.hash(password, 10);
        user.username = username;
        user.email = email;
        let resp = await this.userRepo.save(user);
        return resp;
    }
    async login(input) {
        const { email, password } = input;
        const user = await this.userRepo.findOne({ email }, { select: ['email', 'password', 'id', 'username'] });
        if (!user) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        else {
            throw new common_1.HttpException('Invalid Password', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findAll(options) {
        return await nestjs_typeorm_paginate_1.paginate(this.userRepo, options);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map