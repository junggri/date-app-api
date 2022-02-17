import { Post } from "@src/entities/Post";
export declare class PageEdge {
    cursor: number;
    node: Post;
}
export declare class PageInfo {
    endCursor: number;
    hasNextPage: boolean;
}
export declare class PaginatedPost {
    leftCount: number;
    edges: [PageEdge];
    pageInfo: PageInfo;
}
