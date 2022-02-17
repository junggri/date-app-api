"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const path_1 = __importDefault(require("path"));
const connectionOption = {
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    migrationsRun: process.env.TYPEORM_RUN_MIGRATION === "ture",
    dropSchema: process.env.TYPEORM_DROP_SCHEMA === "true",
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    logging: process.env.TYPEORM_LOGGING === "true",
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: [path_1.default.join(__dirname, process.env.TYPEORM_ENTITY)],
    migrations: [path_1.default.join(__dirname, process.env.TYPEORM_MIGRATION)],
    cli: {
        entitiesDir: "entities",
        migrationsDir: "migrations"
    }
};
module.exports = connectionOption;
