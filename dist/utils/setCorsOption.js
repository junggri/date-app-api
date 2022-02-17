"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCorsOption(_whitelist) {
    return {
        origin: _whitelist,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 200,
        credentials: true,
    };
}
exports.default = setCorsOption;
