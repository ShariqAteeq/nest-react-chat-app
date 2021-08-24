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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("../models");
const user_service_1 = require("./user.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signUp(sinUpUserInput) {
        return await this.userService.create(sinUpUserInput);
    }
    async login(input) {
        let token = await this.userService.login(input);
        const payload = {
            access_token: token,
            type: 'JWT',
            expires: 10000,
        };
        return payload;
    }
    async findAll(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return await this.userService.findAll({
            page,
            limit,
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.SignUpUserInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.LoginUserInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map