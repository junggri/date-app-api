"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hit_resolver_1 = require("./hit.resolver");
const entities_1 = require("../entities");
const hit_service_1 = require("./hit.service");
const post_module_1 = require("../post/post.module");
const date_module_1 = require("../date/date.module");
let HitModule = class HitModule {
};
HitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Hit]),
            post_module_1.PostModule,
            date_module_1.DateModule
        ],
        providers: [
            hit_resolver_1.HitResolver,
            hit_service_1.HitService
        ],
        exports: [
            hit_service_1.HitService
        ]
    })
], HitModule);
exports.HitModule = HitModule;
