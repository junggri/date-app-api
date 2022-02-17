import { Base } from "@src/entities/BaseEntity";
import { Post } from "@src/entities/Post";
export declare class Tag extends Base {
    tag: string;
    postId: number;
    post: Post[];
}
