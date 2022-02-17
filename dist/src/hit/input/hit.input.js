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
exports.DashBoardInput = exports.HitInput = exports.DashBoardFrequency = void 0;
const graphql_1 = require("@nestjs/graphql");
var DashBoardFrequency;
(function (DashBoardFrequency) {
    DashBoardFrequency["ONE_DAY"] = "one_day";
    DashBoardFrequency["SEVEN_DAY"] = "seven_day";
    DashBoardFrequency["FIFTEEN_DAY"] = "fifteen_day";
    DashBoardFrequency["ONE_MONTH"] = "one_month";
    DashBoardFrequency["THREE_MONTH"] = "three_month";
    DashBoardFrequency["SIX_MONTH"] = "six_month";
})(DashBoardFrequency = exports.DashBoardFrequency || (exports.DashBoardFrequency = {}));
(0, graphql_1.registerEnumType)(DashBoardFrequency, {
    name: 'dashBoardFrequency'
});
let HitInput = class HitInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], HitInput.prototype, "postHashId", void 0);
HitInput = __decorate([
    (0, graphql_1.InputType)()
], HitInput);
exports.HitInput = HitInput;
let DashBoardInput = class DashBoardInput {
};
__decorate([
    (0, graphql_1.Field)(() => DashBoardFrequency),
    __metadata("design:type", String)
], DashBoardInput.prototype, "frequency", void 0);
DashBoardInput = __decorate([
    (0, graphql_1.InputType)()
], DashBoardInput);
exports.DashBoardInput = DashBoardInput;
