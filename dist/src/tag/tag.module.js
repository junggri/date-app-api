"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const common_1 = require("@nestjs/common");
const tag_resolver_1 = require("./tag.resolver");
const tag_service_1 = require("./tag.service");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const hashids_module_1 = require("../hashids/hashids.module");
let TagModule = class TagModule {
};
TagModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Tag]),
            hashids_module_1.HashidsModule
        ],
        providers: [
            tag_resolver_1.TagResolver,
            tag_service_1.TagService
        ],
        exports: []
    })
], TagModule);
exports.TagModule = TagModule;
