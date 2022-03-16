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
exports.PlaceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const Place_service_1 = require("./Place.service");
const place_input_1 = require("./input/place.input");
const entities_1 = require("../entities");
let PlaceResolver = class PlaceResolver {
    constructor(placeService) {
        this.placeService = placeService;
    }
    ping() {
        return "pong";
    }
    getPlace() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.placeService.getPlace();
        });
    }
    insertPlace(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.placeService.createPlace(data);
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaceResolver.prototype, "ping", null);
__decorate([
    (0, graphql_1.Query)(() => [entities_1.Place]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "getPlace", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_input_1.PlaceInput]),
    __metadata("design:returntype", Promise)
], PlaceResolver.prototype, "insertPlace", null);
PlaceResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [Place_service_1.PlaceService])
], PlaceResolver);
exports.PlaceResolver = PlaceResolver;
