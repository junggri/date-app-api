"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
const pagination_input_1 = require("./input/pagination.input");
const entities_1 = require("../entities");
const pagination_1 = require("../entities/pagination");
let PaginationService = class PaginationService {
    pagination({ first, after, filter }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = query.clone();
            query.take(first);
            query.orderBy("post.id", "DESC");
            if (filter === "open") {
                query.where("open = :open", { open: 1 });
            }
            else if (filter === "close") {
                query.where("open = :open", { open: 0 });
                query.andWhere("is_published = :is_published", { is_published: 1 });
            }
            else {
                query.where("is_published = :is_published", { is_published: 0 });
                query.andWhere("open = :open", { open: 0 });
            }
            if (after) {
                query.andWhere("post.id < :id", { id: after });
            }
            const result = yield query.getMany();
            const endCursorId = result.length > 0 ? result.slice(-1)[0].id : null;
            yield countQuery
                .where("post.id < :id", { id: endCursorId });
            if (filter === "open") {
                yield countQuery.andWhere("open = :open", { open: 1 });
            }
            else if (filter === "close") {
                yield countQuery.andWhere("open = :open", { open: 0 });
            }
            else {
                yield countQuery.andWhere("is_published = :is_published", { is_published: 0 });
            }
            const leftCount = yield countQuery.getCount();
            const edges = result.map((e) => {
                return {
                    cursor: e.id,
                    node: e
                };
            });
            const pageInfo = new pagination_1.PageInfo();
            pageInfo.endCursor = edges.length ? edges.slice(-1)[0].cursor : null;
            pageInfo.hasNextPage = leftCount > 0;
            return { leftCount, edges, pageInfo };
        });
    }
};
PaginationService = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
exports.PaginationService = PaginationService;
