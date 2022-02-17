import { Tag } from "@src/entities";
import { Repository } from "typeorm";
import { TagDeleteInput, TagInput } from "@src/tag/input/tag.input";
import { HashidsService } from "@src/hashids/hashids.service";
export declare class TagService {
    private tagRepository;
    private readonly hashIdsService;
    constructor(tagRepository: Repository<Tag>, hashIdsService: HashidsService);
    getTags(): Promise<Tag[]>;
    upsertTag(data: TagInput): Promise<Tag | "exist already">;
    deleteTag(data: TagDeleteInput): Promise<number>;
}
