import { Post } from "@src/entities";
import { EntitySubscriberInterface, Repository } from "typeorm";
import { PostInput } from "@src/post/input/post.input";
import { HashidsService } from "@src/hashids/hashids.service";
import { FileService } from "@src/file/file.service";
import { FileUpload } from "@src/file/input/file.input";
import { PaginationInput } from "@src/pagination/input/pagination.input";
import { PaginationService } from "@src/pagination/pagination.service";
export declare class PostService implements EntitySubscriberInterface<Post> {
    private postRepository;
    private readonly hashIdsService;
    private readonly fileService;
    private readonly paginationService;
    constructor(postRepository: Repository<Post>, hashIdsService: HashidsService, fileService: FileService, paginationService: PaginationService);
    listenTo(): Function | string;
    getHashIds(): Promise<string[]>;
    findAllPost(paginationArg: PaginationInput): Promise<{
        leftCount: number;
        edges: {
            cursor: number;
            node: Post;
        }[];
        pageInfo: import("../entities/pagination").PageInfo;
    }>;
    findById(hashId: string): Promise<Post>;
    deletePost(hashId: string): Promise<number>;
    toPrivate(hashId: string): Promise<number>;
    upsertPost(post: PostInput, file: FileUpload): Promise<Post>;
    upsertPostTag(postId: number, tags: number[]): Promise<void>;
    onApplicationBootstrap(): Promise<void>;
}
