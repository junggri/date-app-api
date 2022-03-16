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
exports.Place = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const Register_1 = require("./Register");
const Record_1 = require("./Record");
const User_1 = require("./User");
let Place = class Place extends BaseEntity_1.Base {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Place.prototype, "buildingName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Place.prototype, "roadAddress", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Place.prototype, "latitude", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Place.prototype, "longitude", void 0);
__decorate([
    (0, graphql_1.Field)(() => Register_1.Register),
    (0, typeorm_1.ManyToOne)(() => Register_1.Register, register => register.place),
    __metadata("design:type", Register_1.Register)
], Place.prototype, "register", void 0);
__decorate([
    (0, graphql_1.Field)(() => Record_1.Record),
    (0, typeorm_1.OneToOne)(() => Record_1.Record, record => record.place),
    __metadata("design:type", Record_1.Record)
], Place.prototype, "record", void 0);
__decorate([
    (0, graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.place),
    __metadata("design:type", User_1.User)
], Place.prototype, "user", void 0);
Place = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Place);
exports.Place = Place;
