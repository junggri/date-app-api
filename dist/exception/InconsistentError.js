"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InconsistentError = void 0;
const apollo_server_express_1 = require("apollo-server-express");
class InconsistentError extends apollo_server_express_1.ApolloError {
    constructor() {
        super("일치하는 포스트가 없습니다", "NOT_FOUND");
    }
}
exports.InconsistentError = InconsistentError;
