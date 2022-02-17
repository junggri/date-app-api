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
exports.VisitResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const visit_service_1 = require("./visit.service");
const gqlContext_decorator_1 = require("../../decorator/gqlContext.decorator");
const visit_1 = require("../entities/visit");
const hit_input_1 = require("../hit/input/hit.input");
const visit_input_1 = require("./input/visit.input");
let VisitResolver = class VisitResolver {
    constructor(visitService) {
        this.visitService = visitService;
    }
    getVisitDashboard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitService.getVisitDashboard(data);
        });
    }
    createVisit(response, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.visitService.createVisit(response, data);
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [visit_1.Visit], { nullable: true }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hit_input_1.DashBoardInput]),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "getVisitDashboard", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_1.Int),
    __param(0, (0, gqlContext_decorator_1.ctx)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, visit_input_1.VisitInput]),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "createVisit", null);
VisitResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [visit_service_1.VisitService])
], VisitResolver);
exports.VisitResolver = VisitResolver;
