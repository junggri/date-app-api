"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_resolver_1 = require("./post.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const file_module_1 = require("../file/file.module");
const hashids_module_1 = require("../hashids/hashids.module");
const pagination_module_1 = require("../pagination/pagination.module");
const reply_module_1 = require("../reply/reply.module");
const visit_module_1 = require("../visit/visit.module");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Post]),
            file_module_1.FileModule,
            hashids_module_1.HashidsModule,
            pagination_module_1.PaginationModule,
            reply_module_1.ReplyModule,
        ],
        providers: [
            post_resolver_1.PostResolver,
            post_service_1.PostService,
        ],
        exports: [
            post_service_1.PostService
        ]
    })
], PostModule);
exports.PostModule = PostModule;
