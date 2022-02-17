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
exports.GoogleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const google_service_1 = require("./google.service");
const google_1 = require("../entities/google");
const auth_guard_1 = require("../auth/guard/auth.guard");
const Youtube_1 = require("../entities/Youtube");
let GoogleResolver = class GoogleResolver {
    constructor(googleService) {
        this.googleService = googleService;
    }
    getVisitor() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.googleService.getVisitor();
            return {
                totalsForAllResults: {
                    user: JSON.parse(data).totalsForAllResults['ga:users'],
                    session: JSON.parse(data).totalsForAllResults['ga:sessions']
                },
                rows: JSON.parse(data).rows[JSON.parse(data).rows.length - 1][2]
            };
        });
    }
    getVideos(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.googleService.getVideos(data);
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => google_1.Google),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleResolver.prototype, "getVisitor", null);
__decorate([
    (0, graphql_1.Query)(() => Youtube_1.Youtube),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Youtube_1.YoutubeInput]),
    __metadata("design:returntype", Promise)
], GoogleResolver.prototype, "getVideos", null);
GoogleResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [google_service_1.GoogleService])
], GoogleResolver);
exports.GoogleResolver = GoogleResolver;
