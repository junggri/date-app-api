"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const common_1 = require("@nestjs/common");
const hit_input_1 = require("../hit/input/hit.input");
let DateService = class DateService {
    calculateDate(frequency) {
        switch (frequency) {
            case hit_input_1.DashBoardFrequency.ONE_DAY:
                return getDateRange(0, 1);
            case hit_input_1.DashBoardFrequency.SEVEN_DAY:
                return getDateRange(0, 7);
            case hit_input_1.DashBoardFrequency.FIFTEEN_DAY:
                return getDateRange(0, 15);
            case hit_input_1.DashBoardFrequency.ONE_MONTH:
                return getDateRange(1, 0);
            case hit_input_1.DashBoardFrequency.THREE_MONTH:
                return getDateRange(3, 0);
            case hit_input_1.DashBoardFrequency.SIX_MONTH:
                return getDateRange(6, 0);
            default:
                return;
        }
        function getDateRange(minusMonth, minusDate) {
            const now = new Date();
            const diffUtcAndKst = now.getTimezoneOffset() * 60 * 1000;
            const diffHour = now.getTimezoneOffset() / 60;
            const kstTime = new Date(now.getTime() - diffUtcAndKst);
            const before = new Date(kstTime.getFullYear(), kstTime.getMonth() - minusMonth, kstTime.getDate() - minusDate, 0 - diffHour, 0, 0);
            const after = new Date(kstTime.getFullYear(), kstTime.getMonth(), kstTime.getDate() + 1, 0 - diffHour, 0, 0);
            return { before, after };
        }
    }
};
DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
exports.DateService = DateService;
