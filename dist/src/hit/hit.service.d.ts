import { EntitySubscriberInterface, Repository } from "typeorm";
import { Hit } from "@src/entities";
import { DashBoardInput, HitInput } from "@src/hit/input/hit.input";
import { Response } from "express";
import { HashidsService } from "@src/hashids/hashids.service";
import { PostService } from "@src/post/post.service";
import { DateService } from "@src/date/date.service";
export declare class HitService implements EntitySubscriberInterface<Hit> {
    private hitRepository;
    private readonly hashIdsService;
    private readonly postService;
    private readonly dateService;
    constructor(hitRepository: Repository<Hit>, hashIdsService: HashidsService, postService: PostService, dateService: DateService);
    listenTo(): Function | string;
    parseCookie(value: string | undefined): string[];
    getDashBoard(hashId: string, data: DashBoardInput): Promise<Hit[]>;
    createHit(res: Response, data: HitInput): Promise<string>;
}
