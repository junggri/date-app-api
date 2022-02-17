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
exports.ReplyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const reply_input_1 = require("./input/reply.input");
const hashids_service_1 = require("../hashids/hashids.service");
const external_service_1 = require("../externalApi/external.service");
let ReplyService = class ReplyService {
    constructor(replyRepository, hashIdService, externalApi) {
        this.replyRepository = replyRepository;
        this.hashIdService = hashIdService;
        this.externalApi = externalApi;
    }
    getReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistHashId = !!data.hashId;
            const postId = this.hashIdService.decode(data.hashId);
            if (isExistHashId && !postId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            const result = yield this.replyRepository
                .createQueryBuilder('reply')
                .select()
                .where("reply.post_id = :id", { id: postId })
                .andWhere('parent_id is NULL')
                .getMany();
            console.log(result);
            return result;
        });
    }
    upsertReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let insertResult;
            const isExistHashId = !!data.hashId;
            const isExistReplyHashId = !!data.replyHashId;
            const postId = this.hashIdService.decode(data.hashId);
            const replyId = this.hashIdService.decode(data.replyHashId);
            if (isExistHashId && !postId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            if (isExistReplyHashId && !replyId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            if (replyId) {
                const updateResult = yield this.replyRepository
                    .createQueryBuilder('reply')
                    .update()
                    .set({
                    comment: data.comment
                })
                    .where("reply.id = :id", { id: replyId })
                    .andWhere("post.id =:id", { id: postId })
                    .execute();
                if (!updateResult.affected) {
                    throw new Error("존재하지 않는 댓글입니다.");
                }
                return this.replyRepository
                    .createQueryBuilder('reply')
                    .select()
                    .where("reply.id = :id", { id: replyId })
                    .getOne();
            }
            if (!data.parentId) {
                const replySummary = yield this.replyRepository
                    .createQueryBuilder('reply')
                    .select("COUNT(DISTINCT bgroup)", "bgroup")
                    .addSelect("COUNT(*)", "sorts")
                    .where("reply.post_id = :id", { id: postId })
                    .getRawOne();
                insertResult = yield this.replyRepository
                    .createQueryBuilder('reply')
                    .insert()
                    .values({
                    bgroup: parseInt(replySummary.bgroup) + 1,
                    sorts: 0,
                    depth: 1,
                    comment: data.comment,
                    writer: data.writer,
                    postId: postId,
                    parentId: data.parentId
                })
                    .execute();
            }
            else {
                const replySummary = yield this.replyRepository
                    .createQueryBuilder('reply')
                    .select()
                    .where("reply.id = :parentId", { parentId: data.parentId })
                    .getOne();
                if (!replySummary) {
                    throw new Error("유효하지 않은 접근입니다.");
                }
                yield this.replyRepository
                    .createQueryBuilder('reply')
                    .update()
                    .set({
                    sorts: () => "sorts + 1"
                })
                    .where("reply.sorts > :sorts", { sorts: replySummary.sorts })
                    .andWhere("reply.bgroup = :bgroup", { bgroup: replySummary.bgroup })
                    .execute();
                insertResult = yield this.replyRepository
                    .createQueryBuilder('reply')
                    .insert()
                    .values({
                    bgroup: replySummary.bgroup,
                    sorts: replySummary.sorts + 1,
                    depth: replySummary.depth + 1,
                    comment: data.comment,
                    writer: data.writer,
                    postId: postId,
                    parentId: data.parentId
                })
                    .execute();
            }
            const smsData = {
                name: data.writer,
                content: data.comment,
                title: data.postTitle
            };
            yield this.externalApi.sendSMS(smsData);
            const reply = yield this.replyRepository
                .createQueryBuilder('reply')
                .select()
                .where("reply.id = :id", { id: insertResult.identifiers[0].id })
                .getOne();
            return reply;
        });
    }
    deleteReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistHashId = !!data.hashId;
            const postId = this.hashIdService.decode(data.hashId);
            if (isExistHashId && !postId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            yield this.replyRepository
                .createQueryBuilder('reply')
                .softDelete()
                .where("reply.id in (:ids)", { ids: data.replyIds })
                .execute();
        });
    }
};
ReplyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Reply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashids_service_1.HashidsService,
        external_service_1.ExternalService])
], ReplyService);
exports.ReplyService = ReplyService;
