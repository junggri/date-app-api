import { Likes } from "@src/entities";
import { Repository } from "typeorm";
import { LikeInput } from "@src/like/input/like.input";
import { Response } from 'express';
import { HashidsService } from "@src/hashids/hashids.service";
export declare class LikeService {
    private readonly likeRepository;
    private readonly hashIdsService;
    constructor(likeRepository: Repository<Likes>, hashIdsService: HashidsService);
    parseCookie(value: string | undefined): string[];
    createLike(res: Response, data: LikeInput): Promise<Likes>;
}
