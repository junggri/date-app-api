import { PaginationInput } from "@src/pagination/input/pagination.input";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { Post } from "@src/entities";
import { PageInfo } from "@src/entities/pagination";
export declare class PaginationService {
    pagination({ first, after, filter }: PaginationInput, query: SelectQueryBuilder<Post>): Promise<{
        leftCount: number;
        edges: {
            cursor: number;
            node: Post;
        }[];
        pageInfo: PageInfo;
    }>;
}
