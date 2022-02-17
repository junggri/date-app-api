"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitModule = void 0;
const common_1 = require("@nestjs/common");
const visit_service_1 = require("./visit.service");
const typeorm_1 = require("@nestjs/typeorm");
const visit_1 = require("../entities/visit");
const visit_resolver_1 = require("./visit.resolver");
const date_module_1 = require("../date/date.module");
const external_module_1 = require("../externalApi/external.module");
let VisitModule = class VisitModule {
};
VisitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([visit_1.Visit]),
            date_module_1.DateModule,
            external_module_1.ExternalModule
        ],
        providers: [
            visit_service_1.VisitService,
            visit_resolver_1.VisitResolver
        ],
        exports: []
    })
], VisitModule);
exports.VisitModule = VisitModule;
