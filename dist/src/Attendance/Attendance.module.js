"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const Attendance_resolver_1 = require("./Attendance.resolver");
const Attendance_service_1 = require("./Attendance.service");
const entities_1 = require("../entities");
const typeorm_1 = require("@nestjs/typeorm");
let AttendanceModule = class AttendanceModule {
};
AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Attendance])],
        providers: [
            Attendance_resolver_1.AttendanceResolver,
            Attendance_service_1.AttendanceService
        ],
        exports: []
    })
], AttendanceModule);
exports.AttendanceModule = AttendanceModule;