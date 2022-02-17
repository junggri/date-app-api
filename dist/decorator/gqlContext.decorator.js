"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctx = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.ctx = (0, common_1.createParamDecorator)((_, context) => {
    if (context.getType() === "http") {
        return context.switchToHttp().getRequest().res;
    }
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().res;
});
