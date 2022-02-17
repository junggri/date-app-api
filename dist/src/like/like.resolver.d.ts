import { LikeService } from "@src/like/like.service";
import { Likes } from "@src/entities";
import { LikeInput } from "@src/like/input/like.input";
import { Response } from "express";
export declare class LikeResolver {
    private readonly likeService;
    constructor(likeService: LikeService);
    createLike(res: Response, data: LikeInput): Promise<Likes>;
}
