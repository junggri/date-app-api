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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const tag_input_1 = require("./input/tag.input");
const hashids_service_1 = require("../hashids/hashids.service");
let TagService = class TagService {
    constructor(tagRepository, hashIdsService) {
        this.tagRepository = tagRepository;
        this.hashIdsService = hashIdsService;
    }
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tagRepository
                .createQueryBuilder("tag")
                .select()
                .getMany();
        });
    }
    upsertTag(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistHashId = !!data.hashId;
            const tagId = this.hashIdsService.decode(data.hashId);
            if (isExistHashId && !tagId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            if (tagId) {
                const updateResult = yield this.tagRepository
                    .createQueryBuilder("tag")
                    .update()
                    .set({
                    tag: data.tagName
                })
                    .where('tag.id = :id', { id: tagId })
                    .execute();
                if (!updateResult.affected) {
                    throw new Error("존재하지 않는 테그입니다.");
                }
                return yield this.tagRepository
                    .createQueryBuilder("tag")
                    .select()
                    .where('tag.id = :id', { id: tagId })
                    .getOne();
            }
            const tags = yield this.tagRepository
                .createQueryBuilder("tag")
                .select("tag")
                .getMany();
            const existTag = tags.map((e) => e.tag).includes(data.tagName);
            if (existTag) {
                return "exist already";
            }
            const insertResult = yield this.tagRepository
                .createQueryBuilder("tag")
                .insert()
                .values({
                tag: data.tagName
            })
                .execute();
            const tag = yield this.tagRepository
                .createQueryBuilder("tag")
                .select()
                .where("tag.id = :id", { id: insertResult.identifiers[0].id })
                .getOne();
            return tag;
        });
    }
    deleteTag(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistHashId = !!data.hashId;
            const tagId = this.hashIdsService.decode(data.hashId);
            if (isExistHashId && !tagId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            const deleteResult = yield this.tagRepository
                .createQueryBuilder("tag")
                .delete()
                .where("tag .id = :id", { id: tagId })
                .execute();
            return deleteResult.affected;
        });
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashids_service_1.HashidsService])
], TagService);
exports.TagService = TagService;
