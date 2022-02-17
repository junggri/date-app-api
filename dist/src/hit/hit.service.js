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
exports.HitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const hit_input_1 = require("./input/hit.input");
const hashids_service_1 = require("../hashids/hashids.service");
const uuid_1 = require("uuid");
const constant_1 = require("../../utils/constant");
const post_service_1 = require("../post/post.service");
const date_service_1 = require("../date/date.service");
function getDateByFrequency(frequency) {
    switch (frequency) {
        default:
        case hit_input_1.DashBoardFrequency.ONE_MONTH:
            return initialDate(1);
        case hit_input_1.DashBoardFrequency.THREE_MONTH:
            return initialDate(3);
        case hit_input_1.DashBoardFrequency.SIX_MONTH:
            return initialDate(6);
    }
}
function initialDate(minusMonth) {
    const today = new Date();
    const before = new Date(today.getFullYear(), today.getMonth() - minusMonth, today.getDate(), 0, 0, 0);
    const after = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);
    return { before, after };
}
let HitService = class HitService {
    constructor(hitRepository, hashIdsService, postService, dateService) {
        this.hitRepository = hitRepository;
        this.hashIdsService = hashIdsService;
        this.postService = postService;
        this.dateService = dateService;
    }
    listenTo() {
        return entities_1.Hit;
    }
    parseCookie(value) {
        if (!value) {
            return [];
        }
        return Buffer.from(unescape(value), "base64")
            .toString("ascii")
            .split(/_/g)
            .filter((i) => i);
    }
    getDashBoard(hashId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = this.hashIdsService.decode(hashId);
            if (!postId) {
                throw new Error("존재하지 않는 포스트입니다.");
            }
            const { before, after } = this.dateService.calculateDate(data.frequency);
            const result = yield this.hitRepository
                .createQueryBuilder('hit')
                .leftJoinAndSelect('hit.post', 'post')
                .where("post.id = :id", { id: postId })
                .andWhere("hit.created_at >= :before", { before })
                .andWhere("hit.created_at < :after", { after })
                .getMany();
            return result;
        });
    }
    createHit(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hitIdentifier = res.req.cookies['identifier'];
            const identifier = hitIdentifier || (0, uuid_1.v4)();
            const visitedPost = this.parseCookie(res.req.cookies["viewed_post"]);
            if (visitedPost.length > 100) {
                visitedPost.splice(0, 1);
            }
            if (visitedPost.indexOf(data.postHashId) !== -1) {
                return null;
            }
            const postId = yield this.hashIdsService.decode(data.postHashId);
            if (!postId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            const post = yield this.postService.findById(data.postHashId);
            if (!post) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            const insertResult = yield this.hitRepository
                .createQueryBuilder("hit")
                .insert()
                .into(entities_1.Hit)
                .values({
                postId,
                identifier,
            })
                .execute();
            const hit = yield this.hitRepository
                .createQueryBuilder("hit")
                .select()
                .where("hit.id = :id", { id: insertResult.identifiers[0].id })
                .getOne();
            if (hit) {
                res.cookie("viewed_post", Buffer.from([...visitedPost, data.postHashId].join('_')).toString("base64"), { maxAge: constant_1.ONE_YEAR });
            }
            if (!hitIdentifier) {
                res.cookie('identifier', identifier, { maxAge: constant_1.ONE_YEAR });
            }
            return "created";
        });
    }
};
HitService = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_2.EventSubscriber)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Hit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashids_service_1.HashidsService,
        post_service_1.PostService,
        date_service_1.DateService])
], HitService);
exports.HitService = HitService;
