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
exports.ExternalService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const visit_input_1 = require("../visit/input/visit.input");
const crypto_js_1 = __importDefault(require("crypto-js"));
const request_1 = __importDefault(require("request"));
let ExternalService = class ExternalService {
    constructor(configService) {
        this.configService = configService;
    }
    reverseGeolocation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc';
            const coordParmeter = `?coords=${data.lon},${data.lat}`;
            const outputParameter = '&output=json';
            const addressParameter = '&orders=admcode';
            const requestUrl = baseUrl + coordParmeter + outputParameter + addressParameter;
            try {
                const { data: { results: [result] } } = yield axios_1.default.get(requestUrl, {
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                        'X-NCP-APIGW-API-KEY-ID': 'mrx34o7uuz',
                        'X-NCP-APIGW-API-KEY': 'ySzZxWqUsRTsKO7NqDJU8qHu8bt4BYDc3Z7SH7VL'
                    }
                });
                return result;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    sendSMS(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = Date.now().toString();
            const uri = this.configService.get("API_URI");
            const secretKey = this.configService.get("API_SECRETKEY");
            const accessKey = this.configService.get("API_ACCESSKEY");
            const method = "POST";
            const space = " ";
            const newLine = "\n";
            const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
            const url2 = `/sms/v2/services/${uri}/messages`;
            const hmac = crypto_js_1.default.algo.HMAC.create(crypto_js_1.default.algo.SHA256, secretKey);
            hmac.update(method);
            hmac.update(space);
            hmac.update(url2);
            hmac.update(newLine);
            hmac.update(date);
            hmac.update(newLine);
            hmac.update(accessKey);
            const hash = hmac.finalize();
            const signature = hash.toString(crypto_js_1.default.enc.Base64);
            (0, request_1.default)({
                method: method,
                json: true,
                uri: url,
                headers: {
                    "content-type": "application/json",
                    "x-ncp-iam-access-key": accessKey,
                    "x-ncp-apigw-timestamp": date,
                    "x-ncp-apigw-signature-v2": signature,
                },
                body: {
                    type: "SMS",
                    countryCode: "82",
                    from: this.configService.get("API_PHONE"),
                    content: data.title ? `${data.name}님께서 ${data.title}글에 댓글을 남기셨습니다.` : `${data.name}님께서 ${data.content}라고 메시지를 메시지를 보냈습니다.`,
                    messages: [
                        {
                            to: this.configService.get("API_PHONE")
                        }
                    ]
                }
            }, (err, res, html) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(html);
                    return true;
                }
            });
        });
    }
};
ExternalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ExternalService);
exports.ExternalService = ExternalService;
