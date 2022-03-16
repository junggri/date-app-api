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
exports.PlaceInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let PlaceInput = class PlaceInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PlaceInput.prototype, "who", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PlaceInput.prototype, "buildingName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PlaceInput.prototype, "roadAddress", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PlaceInput.prototype, "latitude", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PlaceInput.prototype, "longitude", void 0);
PlaceInput = __decorate([
    (0, graphql_1.InputType)()
], PlaceInput);
exports.PlaceInput = PlaceInput;
