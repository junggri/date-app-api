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
exports.PostResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_service_1 = require("./post.service");
const Post_1 = require("../entities/Post");
const post_input_1 = require("./input/post.input");
const file_input_1 = require("../file/input/file.input");
const hashId_input_1 = require("../entities/input/hashId.input");
const pagination_input_1 = require("../pagination/input/pagination.input");
const pagination_1 = require("../entities/pagination");
const graphql_upload_1 = require("graphql-upload");
let PostResolver = class PostResolver {
    constructor(postService) {
        this.postService = postService;
    }
    getAllPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postService.findAllPost(data);
        });
    }
    getPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postService.findById(data.hashId);
        });
    }
    getHashIdsToBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.postService.getHashIds();
            return { hashIds: data };
        });
    }
    deletePost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postService.deletePost(data.hashId);
        });
    }
    toPrivate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.toPrivate(data.hashId);
        });
    }
    upsertPost(data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postService.upsertPost(data, file);
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => pagination_1.PaginatedPost, { name: "posts", nullable: true }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_input_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getAllPost", null);
__decorate([
    (0, graphql_1.Query)(() => Post_1.Post, { name: 'post' }),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hashId_input_1.HashIdInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPost", null);
__decorate([
    (0, graphql_1.Query)(() => Post_1.HashIds),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getHashIdsToBuild", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hashId_input_1.HashIdInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hashId_input_1.HashIdInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "toPrivate", null);
__decorate([
    (0, graphql_1.Mutation)(() => Post_1.Post),
    __param(0, (0, graphql_1.Args)("data")),
    __param(1, (0, graphql_1.Args)("file", { type: () => graphql_upload_1.GraphQLUpload, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_input_1.PostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "upsertPost", null);
PostResolver = __decorate([
    (0, graphql_1.Resolver)(of => Post_1.Post),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostResolver);
exports.PostResolver = PostResolver;
