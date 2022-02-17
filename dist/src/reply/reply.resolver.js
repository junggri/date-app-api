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
exports.ReplyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const reply_service_1 = require("./reply.service");
const entities_1 = require("../entities");
const reply_input_1 = require("./input/reply.input");
let ReplyResolver = class ReplyResolver {
    constructor(replyService) {
        this.replyService = replyService;
    }
    getReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.replyService.getReply(data);
        });
    }
    upsertReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.replyService.upsertReply(data);
        });
    }
    deleteReply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.replyService.deleteReply(data);
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [entities_1.Reply]),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_input_1.ReplyInput]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "getReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => entities_1.Reply),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_input_1.ReplyCreateInput]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "upsertReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reply_input_1.ReplyDeleteInput]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "deleteReply", null);
ReplyResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [reply_service_1.ReplyService])
], ReplyResolver);
exports.ReplyResolver = ReplyResolver;
