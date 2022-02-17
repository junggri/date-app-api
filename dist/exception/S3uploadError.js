"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3uploadError = void 0;
const apollo_server_express_1 = require("apollo-server-express");
class S3uploadError extends apollo_server_express_1.ApolloError {
    constructor() {
        super("s3 업로드에 실패하였습니다.", "S3_ERROR");
    }
}
exports.S3uploadError = S3uploadError;
