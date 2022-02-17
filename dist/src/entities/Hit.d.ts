import { Post } from "@src/entities/Post";
import { Base } from "@src/entities/BaseEntity";
export declare class Hit extends Base {
    identifier: string;
    post: Post;
    postId: number;
}
