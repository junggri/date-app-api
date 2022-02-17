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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const file_input_1 = require("./input/file.input");
const S3uploadError_1 = require("../../exception/S3uploadError");
const constant_1 = require("../../utils/constant");
let FileService = class FileService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId: this.configService.get('S3_ACCESS_ID'),
            secretAccessKey: this.configService.get('S3_SECRET_KEY'),
            region: this.configService.get('S3_REGION')
        });
    }
    upsertImage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!constant_1.AVAILABLE_MIMETYPES.includes(data.mimetype)) {
                throw new Error("유요하지 않은 이미지 파일확장자입니다.");
            }
            const input = {
                filename: data.filename,
                body: data.createReadStream(),
                mimetype: data.mimetype,
                path: 'image/',
            };
            yield this.uploadToS3(input);
        });
    }
    upsertContent(content, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                filename: `${filename}.txt`,
                body: content,
                mimetype: "text/plain",
                path: "content/"
            };
            yield this.uploadToS3(input);
        });
    }
    uploadToS3(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                'Bucket': this.configService.get("BUCKET_NAME"),
                "ACL": "public-read",
                "Key": data.path + data.filename,
                "Body": data.body,
                "ContentType": data.mimetype
            };
            try {
                return yield this.s3.upload(input).promise();
            }
            catch (e) {
                console.error(e);
                throw new S3uploadError_1.S3uploadError();
            }
        });
    }
    getS3Data(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                'Bucket': this.configService.get("BUCKET_NAME"),
                "Key": data.path + "/" + `${data.data}.txt`
            };
            try {
                const result = yield this.s3.getObject(input).promise();
                return { hashId: data.data, data: result.Body.toString() };
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileService);
exports.FileService = FileService;
