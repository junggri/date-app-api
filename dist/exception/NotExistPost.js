"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExistPost = void 0;
const apollo_server_express_1 = require("apollo-server-express");
class NotExistPost extends apollo_server_express_1.ApolloError {
    constructor() {
        super('포스트가 존재하지 않습니다.');
    }
}
exports.NotExistPost = NotExistPost;
