"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setCorsOption_1 = __importDefault(require("../utils/setCorsOption"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const graphql_upload_1 = require("graphql-upload");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors((0, setCorsOption_1.default)([
            "http://localhost:3002",
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:8081",
        ]));
        app.use((0, compression_1.default)())
            .use((0, cookie_parser_1.default)())
            .use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 10000000, maxFiles: 10 }));
        process.on("uncaughtException", function (err) {
            console.error("uncaughtException (Node is alive)", err);
        });
        app.useGlobalPipes(new common_1.ValidationPipe());
        yield app.listen(process.env.PORT, '0.0.0.0');
        console.log(`listen ${process.env.PORT} port`);
    });
}
bootstrap();
