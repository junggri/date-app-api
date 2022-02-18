"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const config = __importStar(require("../ormconfig"));
const Register_module_1 = require("./Register/Register.module");
const Attendance_module_1 = require("./Attendance/Attendance.module");
const Place_module_1 = require("./Place/Place.module");
const Record_module_1 = require("./Record/Record.module");
const user_module_1 = require("./User/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production",
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(config),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
                cors: {
                    origin: true,
                    credentials: true,
                },
                validationRules: [
                    (0, graphql_depth_limit_1.default)(8)
                ],
                context: ({ req, res }) => ({ req, res }),
            }),
            Register_module_1.RegisterModule,
            Attendance_module_1.AttendanceModule,
            Place_module_1.PlaceModule,
            Record_module_1.RecordModule,
            user_module_1.UserModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
