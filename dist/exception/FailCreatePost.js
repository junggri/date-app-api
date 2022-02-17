"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailCreatePost = void 0;
const apollo_server_express_1 = require("apollo-server-express");
class FailCreatePost extends apollo_server_express_1.ApolloError {
    constructor() {
        super("포스트를 생성할 수 없습니다.", "Fail to created post");
    }
}
exports.FailCreatePost = FailCreatePost;
