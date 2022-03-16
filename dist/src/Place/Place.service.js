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
exports.PlaceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../User/user.service");
const place_input_1 = require("./input/place.input");
let PlaceService = class PlaceService {
    constructor(placeRepository, userService) {
        this.placeRepository = placeRepository;
        this.userService = userService;
    }
    getPlace() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.placeRepository
                .createQueryBuilder('place')
                .leftJoinAndSelect("place.user", "user")
                .getMany();
            console.log(result);
            return result;
        });
    }
    createPlace(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExisted = yield this.placeRepository
                .createQueryBuilder("Place")
                .select()
                .where('place.building_name = :buildingName', { buildingName: data.buildingName })
                .getOne();
            if (isExisted) {
                throw new Error("이미 존재하는 장소입니다.");
            }
            else {
                const user = yield this.userService.getUser(data.who);
                const insertResult = yield this.placeRepository
                    .createQueryBuilder('Place')
                    .insert()
                    .into(entities_1.Place)
                    .values({
                    user: user,
                    buildingName: data.buildingName,
                    roadAddress: data.roadAddress,
                    latitude: data.latitude,
                    longitude: data.longitude
                })
                    .execute();
                return "success";
            }
        });
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                const user = yield this.userService.getUser("ey");
                yield this.placeRepository
                    .createQueryBuilder()
                    .insert()
                    .into(entities_1.Place)
                    .values({
                    user: user,
                    buildingName: 'test',
                    roadAddress: 'test',
                    latitude: 0,
                    longitude: 0
                })
                    .execute();
            }
        });
    }
};
PlaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Place)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], PlaceService);
exports.PlaceService = PlaceService;
