"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
const header = (req, res, next) => {
    res.header("Cache-control", "no-cache, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Access-Control-Allow-Methods", "GET HEAD PUT PATCH POST DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
};
exports.header = header;
