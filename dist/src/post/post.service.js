"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_input_1 = require("./input/post.input");
const NotExistPost_1 = require("../../exception/NotExistPost");
const hashids_service_1 = require("../hashids/hashids.service");
const file_service_1 = require("../file/file.service");
const file_input_1 = require("../file/input/file.input");
const path_1 = __importDefault(require("path"));
const faker = __importStar(require("faker"));
const pagination_input_1 = require("../pagination/input/pagination.input");
const pagination_service_1 = require("../pagination/pagination.service");
let PostService = class PostService {
    constructor(postRepository, hashIdsService, fileService, paginationService) {
        this.postRepository = postRepository;
        this.hashIdsService = hashIdsService;
        this.fileService = fileService;
        this.paginationService = paginationService;
    }
    listenTo() {
        return entities_1.Post;
    }
    getHashIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postRepository
                .createQueryBuilder('post')
                .select("post.id")
                .getMany();
            return posts.map((e) => {
                return this.hashIdsService.encode(e.id);
            });
        });
    }
    findAllPost(paginationArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let contentTable = {};
            const isExist = yield this.postRepository.createQueryBuilder('post').getMany();
            if (!isExist.length) {
                return null;
            }
            const query = this.postRepository
                .createQueryBuilder('post');
            const { leftCount, edges, pageInfo } = yield this.paginationService.pagination(paginationArg, query);
            const promises = edges.map((e) => {
                return new Promise((resolve) => {
                    resolve(this.fileService.getS3Data({
                        path: "content",
                        data: this.hashIdsService.encode(e.node.id)
                    }));
                });
            });
            const contents = yield Promise.all(promises);
            contents.forEach((e) => {
                contentTable[e.hashId] = e.data;
            });
            edges.map((e) => {
                e.node.content = contentTable[e.node.hashId];
            });
            return { leftCount, edges, pageInfo };
        });
    }
    findById(hashId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = this.hashIdsService.decode(hashId);
            if (!postId) {
                throw new Error("존재하지 않는 포스트입니다.");
            }
            const contents = yield this.fileService.getS3Data({ path: "content", data: hashId });
            const originalContent = yield this.fileService.getS3Data({ path: "content", data: hashId + "_original" });
            const data = yield this.postRepository
                .createQueryBuilder("post")
                .select()
                .where("post.id =:id", { id: postId })
                .getOne();
            data.originalContent = originalContent.data;
            data.content = contents.data;
            return data;
        });
    }
    deletePost(hashId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = this.hashIdsService.decode(hashId);
            if (!postId) {
                throw new Error("존재하지 않는 포스트입니다.");
            }
            const target = yield this.postRepository.createQueryBuilder('post')
                .select()
                .where("post.id = :id", { id: postId })
                .getOne();
            if (!target) {
                throw new NotExistPost_1.NotExistPost();
            }
            const data = yield this.postRepository
                .createQueryBuilder('post')
                .delete()
                .from(entities_1.Post)
                .where("id = :id", { id: postId })
                .execute();
            return data.affected;
        });
    }
    toPrivate(hashId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = this.hashIdsService.decode(hashId);
            if (!postId) {
                throw new Error("존재하지 않는 포스트입니다.");
            }
            const target = yield this.postRepository
                .createQueryBuilder('post')
                .select()
                .where("id = :id", { id: postId })
                .getOne();
            if (!target.open) {
                throw new Error("이미 비공개된 포스트입니다.");
            }
            const data = yield this.postRepository
                .createQueryBuilder('post')
                .update(entities_1.Post)
                .set({ open: false })
                .where("id = :id", { id: postId })
                .execute();
            return data.affected;
        });
    }
    upsertPost(post, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let insertResult;
            const isExistHashId = !!post.hashId;
            const isExistThumbnail = !!post.thumbnail;
            let s3Filename = post.hashId;
            let s3ImageName = post.thumbnail;
            let postId = this.hashIdsService.decode(post.hashId);
            if (isExistHashId && !postId || isExistThumbnail && !postId) {
                throw new Error("유효하지 않은 접근입니다.");
            }
            if (file) {
                s3ImageName = s3ImageName || new Date().valueOf() + path_1.default.extname(file.filename);
                yield this.fileService.upsertImage(Object.assign(Object.assign({}, file), { filename: s3ImageName }));
            }
            if (this.hashIdsService.decode(post.hashId)) {
                yield this.postRepository
                    .createQueryBuilder('post')
                    .update(entities_1.Post)
                    .where("post.id = :id", { id: postId })
                    .set({
                    title: post.title,
                    desc: post.desc,
                    open: post.open,
                    thumbnail: s3ImageName
                })
                    .execute();
            }
            else {
                insertResult = yield this.postRepository
                    .createQueryBuilder('post')
                    .insert()
                    .into(entities_1.Post)
                    .values({
                    title: post.title,
                    desc: post.desc,
                    open: post.open,
                    isPublished: post.is_published,
                    thumbnail: s3ImageName,
                })
                    .execute();
                s3Filename = this.hashIdsService.encode(insertResult.identifiers[0].id);
                postId = insertResult.identifiers[0].id;
            }
            yield this.upsertPostTag(postId, post.tagIds);
            yield this.fileService.upsertContent(post.content, s3Filename);
            yield this.fileService.upsertContent(post.originalContent, s3Filename + "_original");
            const upsertPost = yield this.postRepository
                .createQueryBuilder('post')
                .select()
                .where("post.id = :id", { id: postId })
                .getOne();
            return upsertPost;
        });
    }
    upsertPostTag(postId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashTable = {};
            let filter;
            const savedTags = yield this.postRepository
                .createQueryBuilder('post')
                .leftJoinAndSelect("post.tag", 'tag')
                .where('post.id = :id', { id: postId })
                .getOne();
            if (tags.length < savedTags.tagId.length) {
                tags.forEach((e) => {
                    hashTable[e.toString()] = true;
                });
                filter = savedTags.tagId.filter(e => {
                    return !hashTable[e.toString()];
                });
                for (let i = 0; i < filter.length; i++) {
                    yield this.postRepository
                        .createQueryBuilder('post')
                        .delete()
                        .from("post_tag")
                        .where("post_id = :id", { id: postId })
                        .andWhere("tag_id = :tagId", { tagId: filter[i] })
                        .execute();
                }
            }
            else {
                savedTags.tagId.forEach((e) => {
                    hashTable[e.toString()] = true;
                });
                filter = tags.filter(e => {
                    return !hashTable[e.toString()];
                });
                for (let i = 0; i < filter.length; i++) {
                    yield this.postRepository
                        .createQueryBuilder('post')
                        .insert()
                        .into('post_tag')
                        .values({
                        'post_id': postId,
                        'tag_id': filter[i]
                    })
                        .execute();
                }
            }
        });
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV === "production") {
                return;
            }
            for (let i = 0; i < 15; i++) {
            }
            for (let i = 0; i < 7; i++) {
                yield this.postRepository.createQueryBuilder('post')
                    .insert()
                    .into(entities_1.Post)
                    .values({
                    createdAt: faker.datatype.datetime(),
                    updatedAt: faker.datatype.datetime(),
                    title: `${i + 1}`,
                    desc: faker.lorem.sentence(),
                    originalContent: faker.lorem.sentence(),
                    content: faker.lorem.sentence(),
                    thumbnail: faker.lorem.sentence(),
                    open: true,
                })
                    .execute();
                yield this.fileService.upsertContent(faker.lorem.sentence(), this.hashIdsService.encode(i + 1));
                yield this.fileService.upsertContent(faker.lorem.sentence(), this.hashIdsService.encode(i + 1) + "_original");
                for (let j = 0; j < Math.floor(Math.random() * 3); j++) {
                    yield this.postRepository
                        .createQueryBuilder('post')
                        .insert()
                        .into(entities_1.Hit)
                        .values({
                        createdAt: new Date(),
                        updatedAt: faker.datatype.datetime(),
                        postId: i + 1,
                        identifier: `${i + i}글 `
                    })
                        .execute();
                }
            }
            for (let i = 0; i < 4; i++) {
                yield this.postRepository
                    .createQueryBuilder('post')
                    .insert()
                    .into(entities_1.Tag)
                    .values({
                    tag: (i + 1) + "태그",
                })
                    .execute();
            }
            for (let i = 0; i < 3; i++) {
                yield this.postRepository
                    .createQueryBuilder('post')
                    .insert()
                    .into("post_tag")
                    .values({
                    "post_id": 1,
                    "tag_id": i + 1,
                })
                    .execute();
            }
            for (let i = 0; i < 2; i++) {
                yield this.postRepository
                    .createQueryBuilder('post')
                    .insert()
                    .into("post_tag")
                    .values({
                    "post_id": 2,
                    "tag_id": i + 1,
                })
                    .execute();
            }
            for (let i = 0; i < 4; i++) {
                yield this.postRepository
                    .createQueryBuilder('post')
                    .insert()
                    .into("post_tag")
                    .values({
                    "post_id": 3,
                    "tag_id": i + 1,
                })
                    .execute();
            }
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_2.EventSubscriber)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashids_service_1.HashidsService,
        file_service_1.FileService,
        pagination_service_1.PaginationService])
], PostService);
exports.PostService = PostService;
