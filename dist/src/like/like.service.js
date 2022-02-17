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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const like_input_1 = require("./input/like.input");
const uuid_1 = require("uuid");
const hashids_service_1 = require("../hashids/hashids.service");
const constant_1 = require("../../utils/constant");
let LikeService = class LikeService {
    constructor(likeRepository, hashIdsService) {
        this.likeRepository = likeRepository;
        this.hashIdsService = hashIdsService;
    }
    parseCookie(value) {
        if (!value) {
            return [];
        }
        return Buffer.from(unescape(value), "base64")
            .toString("ascii")
            .split('/_/g')
            .filter((i) => i);
    }
    createLike(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const postIdentifier = res.req.cookies['like_identifier'];
            const identifier = postIdentifier ? postIdentifier : (0, uuid_1.v4)();
            const likePost = this.parseCookie(res.req.cookies["like_post"]);
            if (likePost.indexOf(data.postHashId) !== -1) {
                return null;
            }
            const postId = this.hashIdsService.decode(data.postHashId);
            if (!postId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            const insertResult = yield this.likeRepository
                .createQueryBuilder('like')
                .insert()
                .into(entities_1.Likes)
                .values({
                identifier: identifier,
                postId: postId
            })
                .execute();
            const like = yield this.likeRepository
                .createQueryBuilder('like')
                .select()
                .where("id = :id", { id: insertResult.identifiers[0].id })
                .getOne();
            if (like) {
                res.cookie("like_post", Buffer.from([...likePost, data.postHashId].join('_')).toString("base64"), { httpOnly: true, secure: true, maxAge: constant_1.SIX_MONTHS });
            }
            if (!postIdentifier) {
                res.cookie('like_identifier', identifier, { httpOnly: true, secure: true, maxAge: constant_1.SIX_MONTHS });
            }
            return like;
        });
    }
};
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Likes)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashids_service_1.HashidsService])
], LikeService);
exports.LikeService = LikeService;
