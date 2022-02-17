import { Base } from "@src/entities/BaseEntity";
import { Post } from "@src/entities/Post";
export declare class Likes extends Base {
    identifier: string;
    post: Post;
    postId: number;
}
