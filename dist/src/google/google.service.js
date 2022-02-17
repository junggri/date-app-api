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
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
const axios_1 = __importDefault(require("axios"));
const Youtube_1 = require("../entities/Youtube");
let GoogleService = class GoogleService {
    constructor(configService) {
        this.configService = configService;
    }
    getVisitor() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const jwtClient = new googleapis_1.google.auth.JWT(this.configService.get("GA_CLIENT_EMAIL"), null, this.configService.get("GA_PRIVATE_KEY"), ["https://www.googleapis.com/auth/analytics.readonly"], null);
                jwtClient.authorize((err, token) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const analytics = googleapis_1.google.analytics("v3");
                    queryData(analytics);
                });
                const queryData = (analytics) => {
                    analytics.data.ga.get({
                        "auth": jwtClient,
                        "ids": this.configService.get("GA_VIEW_ID"),
                        "start-date": "2021-01-05",
                        "end-date": "today",
                        "dimensions": "ga:date",
                        "metrics": "ga:users,ga:sessions"
                    }, (err, res) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        resolve(JSON.stringify(res.data, null, 4));
                    });
                };
            });
        });
    }
    getVideos(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = input.nextPageToken ? `&pageToken=${input.nextPageToken}` : "";
            const accessParams = `&key=${this.configService.get("GOOGLE_DATA_API")}`;
            const baseURI = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=PLwaHjBUqDBdsjeOb7ymADH_epvhIWhdba&maxResults=20";
            const { data } = yield axios_1.default.get(baseURI + urlParams + accessParams, {
                headers: { 'Accept': 'application/json' }
            });
            const ids = data.items.map((e, i) => {
                if (i === 0) {
                    return e.contentDetails.videoId;
                }
                else {
                    return "2C" + e.contentDetails.videoId;
                }
            });
            const videos = yield axios_1.default.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join("%")}&key=${this.configService.get("GOOGLE_DATA_API")}`, {
                headers: { 'Accept': 'application/json' }
            });
            return { nextPageToken: data.nextPageToken, data: JSON.stringify(videos.data.items) };
        });
    }
};
GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleService);
exports.GoogleService = GoogleService;
