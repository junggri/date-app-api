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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashIds = exports.Post = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Hit_1 = require("./Hit");
const BaseEntity_1 = require("./BaseEntity");
const nestjs_graphql_typeorm_dataloader_1 = require("@webundsoehne/nestjs-graphql-typeorm-dataloader");
const Reply_1 = require("./Reply");
const Tag_1 = require("./Tag");
const Likes_1 = require("./Likes");
let Post = class Post extends BaseEntity_1.Base {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Post.prototype, "desc", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "originalContent", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], Post.prototype, "thumbnail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: true, type: "boolean" }),
    __metadata("design:type", Boolean)
], Post.prototype, "open", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Post.prototype, "isPublished", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Hit_1.Hit], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Hit_1.Hit, hit => hit.post),
    (0, nestjs_graphql_typeorm_dataloader_1.TypeormLoaderExtension)((post) => post.hitId),
    __metadata("design:type", Array)
], Post.prototype, "hit", void 0);
__decorate([
    (0, typeorm_1.RelationId)((post) => post.hit),
    __metadata("design:type", Array)
], Post.prototype, "hitId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Reply_1.Reply], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Reply_1.Reply, reply => reply.post),
    (0, nestjs_graphql_typeorm_dataloader_1.TypeormLoaderExtension)((post) => {
        return post.replyId;
    }),
    __metadata("design:type", Array)
], Post.prototype, "reply", void 0);
__decorate([
    (0, typeorm_1.RelationId)((post) => post.reply),
    __metadata("design:type", Array)
], Post.prototype, "replyId", void 0);
__decorate([
    (0, typeorm_1.RelationId)((post) => post.tag),
    __metadata("design:type", Array)
], Post.prototype, "tagId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Tag_1.Tag]),
    (0, typeorm_1.ManyToMany)(() => Tag_1.Tag, tag => tag.post, { onDelete: "CASCADE" }),
    (0, nestjs_graphql_typeorm_dataloader_1.TypeormLoaderExtension)((post) => {
        return post.tagId;
    }),
    __metadata("design:type", Array)
], Post.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.RelationId)((post) => post.likes),
    __metadata("design:type", Array)
], Post.prototype, "likeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Likes_1.Likes], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Likes_1.Likes, like => like.post),
    (0, nestjs_graphql_typeorm_dataloader_1.TypeormLoaderExtension)((post) => post.likeId),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
Post = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Post);
exports.Post = Post;
let HashIds = class HashIds {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], HashIds.prototype, "hashIds", void 0);
HashIds = __decorate([
    (0, graphql_1.ObjectType)()
], HashIds);
exports.HashIds = HashIds;
