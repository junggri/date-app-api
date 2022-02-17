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
exports.PostInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let PostInput = class PostInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], PostInput.prototype, "hashId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "desc", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "originalContent", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: null }),
    __metadata("design:type", String)
], PostInput.prototype, "thumbnail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PostInput.prototype, "is_published", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], PostInput.prototype, "open", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    __metadata("design:type", Array)
], PostInput.prototype, "tagIds", void 0);
PostInput = __decorate([
    (0, graphql_1.InputType)()
], PostInput);
exports.PostInput = PostInput;
