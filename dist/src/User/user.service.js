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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = require("../entities/User");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository
                .createQueryBuilder()
                .select()
                .where('user.name = :name', { name: name })
                .getOne();
            return result;
        });
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values({
                name: "ey",
                userImage: "",
                birthDay: new Date(1994, 9, 5),
                phoneNumber: "01027181612"
            })
                .execute();
            yield this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values({
                name: "js",
                userImage: "",
                birthDay: new Date(1994, 10, 3),
                phoneNumber: "01077652103"
            })
                .execute();
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
