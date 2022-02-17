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
const hit_module_1 = require("./hit/hit.module");
const post_module_1 = require("./post/post.module");
const hashids_module_1 = require("./hashids/hashids.module");
const file_module_1 = require("./file/file.module");
const tag_module_1 = require("./tag/tag.module");
const core_1 = require("@nestjs/core");
const nestjs_graphql_typeorm_dataloader_1 = require("@webundsoehne/nestjs-graphql-typeorm-dataloader");
const typeorm_2 = require("typeorm");
const reply_module_1 = require("./reply/reply.module");
const like_module_1 = require("./like/like.module");
const complexity_1 = require("../utils/complexity");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const visit_module_1 = require("./visit/visit.module");
const date_module_1 = require("./date/date.module");
const external_module_1 = require("./externalApi/external.module");
const pagination_module_1 = require("./pagination/pagination.module");
const message_module_1 = require("./message/message.module");
const google_module_1 = require("./google/google.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const encrypt_module_1 = require("./encrypt/encrypt.module");
const config = __importStar(require("../ormconfig"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useFactory: () => new nestjs_graphql_typeorm_dataloader_1.DataLoaderInterceptor({
                    typeormGetConnection: typeorm_2.getConnection
                })
            },
            complexity_1.ComplexityPlugin
        ],
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
                buildSchemaOptions: {
                    fieldMiddleware: [nestjs_graphql_typeorm_dataloader_1.TypeormLoaderMiddleware]
                },
                validationRules: [
                    (0, graphql_depth_limit_1.default)(8)
                ],
                context: ({ req, res }) => ({ req, res }),
            }),
            post_module_1.PostModule,
            hit_module_1.HitModule,
            hashids_module_1.HashidsModule,
            file_module_1.FileModule,
            reply_module_1.ReplyModule,
            tag_module_1.TagModule,
            like_module_1.LikeModule,
            visit_module_1.VisitModule,
            date_module_1.DateModule,
            external_module_1.ExternalModule,
            pagination_module_1.PaginationModule,
            message_module_1.MessageModule,
            google_module_1.GoogleModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            encrypt_module_1.EncryptModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
