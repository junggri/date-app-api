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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const visit_1 = require("../entities/visit");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const date_service_1 = require("../date/date.service");
const hit_input_1 = require("../hit/input/hit.input");
const external_service_1 = require("../externalApi/external.service");
const visit_input_1 = require("./input/visit.input");
const constant_1 = require("../../utils/constant");
const constant_2 = require("../../cores/constant");
const faker_1 = __importDefault(require("faker"));
let VisitService = class VisitService {
    constructor(visitRepository, dateService, externalService) {
        this.visitRepository = visitRepository;
        this.dateService = dateService;
        this.externalService = externalService;
    }
    getVisitDashboard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { before, after } = this.dateService.calculateDate(data.frequency);
            const result = yield this.visitRepository
                .createQueryBuilder('visit')
                .andWhere("visit.created_at >= :before", { before })
                .andWhere("visit.created_at < :after", { after })
                .orderBy("visit.created_at", "DESC")
                .getMany();
            return result;
        });
    }
    createVisit(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const visitIdentifier = res.req.cookies['visit_identifier'];
            const now = new Date();
            const kst = new Date(now.setHours(now.getHours() + 9));
            if (visitIdentifier) {
                const recentDate = yield this.visitRepository
                    .createQueryBuilder('visit')
                    .select()
                    .where("identifier = :identifier", { identifier: visitIdentifier })
                    .getOne();
                const diff = (kst - recentDate.updatedAt) / constant_2.TEN_MINUTE;
                if (diff >= 1) {
                    const updateResult = yield this.visitRepository
                        .createQueryBuilder("visit")
                        .update()
                        .set({
                        count: () => 'count + 1'
                    })
                        .where("identifier = :identifier", { identifier: visitIdentifier })
                        .execute();
                    return updateResult.affected;
                }
                return;
            }
            const identifier = (0, uuid_1.v4)();
            const geolocation = yield this.externalService.reverseGeolocation(data);
            const insertResult = yield this.visitRepository
                .createQueryBuilder('visit')
                .insert()
                .values({
                identifier: identifier,
                country: geolocation.region.area0.name,
                city: geolocation.region.area1.name,
                regionName: geolocation.region.area2.name,
                regionAddress: geolocation.region.area3.name
            })
                .execute();
            res.cookie('visit_identifier', identifier, { maxAge: constant_1.ONE_DAY, httpOnly: true });
            return insertResult.identifiers[0].id;
        });
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV === "production") {
                return;
            }
            for (let i = 0; i < 15; i++) {
                yield this.visitRepository
                    .createQueryBuilder()
                    .insert()
                    .values({
                    identifier: faker_1.default.random.uuid(),
                    country: "kr",
                    city: "서울특별시",
                    regionName: "123123",
                    regionAddress: "12123"
                })
                    .execute();
                yield this.visitRepository
                    .createQueryBuilder()
                    .insert()
                    .values({
                    identifier: faker_1.default.random.uuid(),
                    country: "kr",
                    city: "부산광역시",
                    regionName: "123123",
                    regionAddress: "12123"
                })
                    .execute();
            }
        });
    }
};
VisitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visit_1.Visit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        date_service_1.DateService,
        external_service_1.ExternalService])
], VisitService);
exports.VisitService = VisitService;
