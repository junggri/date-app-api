import { PostService } from '@src/post/post.service';
import { Post } from "@src/entities/Post";
import { PostInput } from "@src/post/input/post.input";
import { FileUpload } from "@src/file/input/file.input";
import { HashIdInput } from "@src/entities/input/hashId.input";
import { PaginationInput } from "@src/pagination/input/pagination.input";
export declare class PostResolver {
    private readonly postService;
    constructor(postService: PostService);
    getAllPost(data: PaginationInput): Promise<{
        leftCount: number;
        edges: {
            cursor: number;
            node: Post;
        }[];
        pageInfo: import("@src/entities/pagination").PageInfo;
    }>;
    getPost(data: HashIdInput): Promise<Post>;
    getHashIdsToBuild(): Promise<{
        hashIds: string[];
    }>;
    deletePost(data: HashIdInput): Promise<number>;
    toPrivate(data: HashIdInput): Promise<number>;
    upsertPost(data: PostInput, file: FileUpload): Promise<Post>;
}
