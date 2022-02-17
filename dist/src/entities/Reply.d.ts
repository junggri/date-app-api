import { Base } from "@src/entities/BaseEntity";
import { Post } from "@src/entities/Post";
export declare class Reply extends Base {
    id: number;
    bgroup: number;
    sorts: number;
    depth: number;
    comment: string;
    writer: string;
    post: Post;
    postId: number;
    parentId?: number;
}
