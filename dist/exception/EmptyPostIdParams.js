"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyPostIdParams = void 0;
const apollo_server_express_1 = require("apollo-server-express");
class EmptyPostIdParams extends apollo_server_express_1.ApolloError {
    constructor() {
        super("포스트 식별자가 존재하지 않습니다.", "NO_IDENTIFIER");
    }
}
exports.EmptyPostIdParams = EmptyPostIdParams;
