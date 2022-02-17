import { HitService } from "@src/hit/hit.service";
import { Response } from "express";
import { DashBoardInput, HitInput } from "@src/hit/input/hit.input";
import { Hit } from "@src/entities";
import { HashIdInput } from "@src/entities/input/hashId.input";
export declare class HitResolver {
    private readonly hitService;
    constructor(hitService: HitService);
    createHit(res: Response, data: HitInput): Promise<string>;
    getDashBoard(dataHashId: HashIdInput, data: DashBoardInput): Promise<Hit[]>;
}
