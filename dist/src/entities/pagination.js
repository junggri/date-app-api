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
exports.PaginatedPost = exports.PageInfo = exports.PageEdge = void 0;
const graphql_1 = require("@nestjs/graphql");
const Post_1 = require("./Post");
let PageEdge = class PageEdge {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PageEdge.prototype, "cursor", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Post_1.Post)
], PageEdge.prototype, "node", void 0);
PageEdge = __decorate([
    (0, graphql_1.ObjectType)()
], PageEdge);
exports.PageEdge = PageEdge;
let PageInfo = class PageInfo {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PageInfo.prototype, "endCursor", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasNextPage", void 0);
PageInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PageInfo);
exports.PageInfo = PageInfo;
let PaginatedPost = class PaginatedPost {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], PaginatedPost.prototype, "leftCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PageEdge]),
    __metadata("design:type", Array)
], PaginatedPost.prototype, "edges", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", PageInfo)
], PaginatedPost.prototype, "pageInfo", void 0);
PaginatedPost = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedPost);
exports.PaginatedPost = PaginatedPost;
