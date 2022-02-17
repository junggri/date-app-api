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
exports.Session = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const process = __importStar(require("process"));
class Session {
    static create() {
        const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
        const _client = redis_1.default.createClient({
            host: process.env.SESSION_HOST,
            port: Number(process.env.SESSION_PORT)
        });
        return {
            secret: process.env.SESSION_SECRET_KEY,
            name: "sid",
            resave: false,
            saveUninitialized: true,
            store: new RedisStore({
                client: _client,
                ttl: 60 * 60 * 24
            }),
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            }
        };
    }
}
exports.Session = Session;
